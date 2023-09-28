import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { API_URI } from '@env';

const httpLink = new HttpLink({
  uri: API_URI,
  credentials: 'include'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export { client };
