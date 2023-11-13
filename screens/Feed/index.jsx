import { useContext, useEffect, useMemo, useRef } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { IconButton } from 'react-native-paper';
import _ from 'lodash';

import { GlobalContext } from '../../context/GlobalContext';
import queries from '../../apollo/graphql';

import ViewLoading from '../../components/ViewLoading';

import Message from '../../modules/Message';

const OFFSET_INIT = 0;
const LIMIT_INIT = 30;

const retrieveConversationQuery = queries.query.retrieveConversation;
const getMessageQuery = queries.query.getConversationMessages;

const sendMessageMutation = queries.mutation.sendMessage;

const sentMessageSubscription = queries.subscription.sentMessage;

const FeedView = ({ route, navigation }) => {
  const { user } = useContext(GlobalContext);
  const { conversationId } = route.params || null;
  const inputRef = useRef(null);

  const { data: conversationData } = useQuery(retrieveConversationQuery, {
    variables: {
      conversationId
    },
    onCompleted: data => {
      const conversation = data.retrieveConversation;

      return navigation.setParams({
        conversation
      });
    }
  });

  const conversation = conversationData?.retrieveConversation || null;

  const {
    data: conversationMessages,
    loading: getMessageLoading,
    subscribeToMore,
    fetchMore: fetchMoreMessages
  } = useQuery(getMessageQuery, {
    variables: {
      inputs: {
        conversationId,
        offset: OFFSET_INIT,
        limit: LIMIT_INIT
      }
    },
    fetchPolicy: 'network-only'
  });

  const messages = conversationMessages?.getConversationMessages || [];

  const [sendMessage] = useMutation(sendMessageMutation);

  useEffect(() => {
    subscribeToMore({
      document: sentMessageSubscription,
      variables: { conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newMessage = subscriptionData.data.sentMessage;

        return Object.assign({}, prev, {
          getConversationMessages: [
            ...prev.getConversationMessages,
            newMessage.message
          ]
        });
      }
    });
  }, []);

  const handlePressSend = () => {
    const message = inputRef.current.value.trim();

    if (!message) return;

    inputRef.current.clear();
    inputRef.current.value = '';

    return sendMessage({
      variables: {
        inputs: {
          conversationId,
          content: message
        }
      }
    });
  };

  const handleFetchMoreMessages = () => {
    return fetchMoreMessages({
      variables: {
        inputs: {
          conversationId,
          offset: messages.length,
          limit: LIMIT_INIT
        }
      }
    });
  };

  const renderMessages = useMemo(() => {
    const getSender = userId =>
      _.find(conversation?.participants, participant => {
        return participant?.id === userId;
      });

    const reverseMessage = [...messages].reverse();

    return (
      <>
        {!_.isEmpty(messages) && (
          <FlatList
            data={reverseMessage}
            inverted
            keyExtractor={(_, index) => index}
            renderItem={({ item, index }) => {
              const previousSameUser =
                index !== 0
                  ? reverseMessage[index - 1].userId ===
                    reverseMessage[index].userId
                  : false;

              const nextSameUser =
                index !== reverseMessage.length - 1
                  ? reverseMessage[index + 1].userId ===
                    reverseMessage[index].userId
                  : false;
              return (
                <Message
                  isOwner={item?.userId === user.id}
                  previousSameUser={previousSameUser}
                  nextSameUser={nextSameUser}
                  message={item}
                  sender={getSender(item?.userId)}
                />
              );
            }}
            onEndReached={() => handleFetchMoreMessages()}
          />
        )}
      </>
    );
  }, [user, messages, conversation]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1
          }}
        >
          {getMessageLoading ? <ViewLoading /> : renderMessages}
        </View>
        <View
          style={{
            //   position: 'absolute',
            //   bottom: 0,
            //   left: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 10
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              ref={inputRef}
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: '#272a30',
                color: '#ffffff',
                fontSize: 15
              }}
              placeholderTextColor="#ffffff"
              multiline={true}
              placeholder="Aa"
              onChangeText={value => (inputRef.current.value = value)}
            />
          </View>
          <View>
            <IconButton size={20} icon="send" onPress={handlePressSend} />
          </View>
        </View>
      </View>
    </>
  );
};

export default FeedView;
