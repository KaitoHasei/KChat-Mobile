import React, { useContext, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useQuery } from '@apollo/client';
import _ from 'lodash';

import queries from '../../apollo/graphql';

import { Conversation } from '../../components';
import ViewLoading from '../../components/ViewLoading';

const getConversationQuery = queries.query.getConversations;

const hasUpdateConversationSubscription =
  queries.subscription.hasUpdateConversation;

const Chat = ({ navigation }) => {
  const {
    data: conversationData,
    loading: getConversationLoading,
    subscribeToMore
  } = useQuery(getConversationQuery, {
    onError: error => console.log(error),
    fetchPolicy: 'network-only'
  });

  const conversations = conversationData?.getConversations || [];

  useEffect(() => {
    subscribeToMore({
      document: hasUpdateConversationSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const conversationUpdated =
          subscriptionData.data.hasUpdateConversation.conversation;
        const oldConversations = prev.getConversations;

        const removedExistConversation = oldConversations.filter(
          conversation => !conversation.id === conversationUpdated.id
        );

        return Object.assign({}, prev, {
          getConversations: [conversationUpdated, ...removedExistConversation]
        });
      }
    });
  }, []);

  const handlePressConversation = conversation =>
    navigation.navigate('FeedView', {
      conversationId: conversation?.id
    });

  return (
    <>
      {getConversationLoading ? (
        <ViewLoading />
      ) : (
        <View>
          {!_.isEmpty(conversations) && (
            <FlatList
              data={conversations}
              keyExtractor={(_, index) => index}
              renderItem={({ item }) => (
                <Conversation
                  conversation={item}
                  onPress={handlePressConversation}
                />
              )}
            />
          )}
        </View>
      )}
    </>
  );
};

export default Chat;
