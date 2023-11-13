import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import * as SecureStore from 'expo-secure-store';

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('access_token');

  const customHeaders = {
    headers: {
      ...headers,
      authorization: token ? `${token}` : ''
    }
  };

  return customHeaders;
});

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_API_URI,
  credentials: 'include',
  headers: {
    'client-name': 'kchat-mobile'
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.EXPO_PUBLIC_WS_URI,
    connectionParams: async () => {
      const token = await SecureStore.getItemAsync('access_token');

      return {
        'client-name': 'kchat-mobile',
        authorization: token
      };
    }
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getConversationMessages: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              const firstExisting = existing?.[0]?.createdAt || null;
              const firstIncoming = incoming?.[0]?.createdAt || null;
              const isFetchMore = firstExisting !== firstIncoming;

              if (!isFetchMore) return incoming;
              return [...incoming, ...existing];
            }
          }
        }
      }
    }
  })
});

export { client };
