import { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useMutation } from '@apollo/client';

import queries from '../../apollo/graphql';

import UserCard from '../../modules/UserCard';

const createConversationMutation = queries.mutation.createConversation;

const Search = ({ route, navigation }) => {
  const { listUser } = route.params || [];

  const [createConversation] = useMutation(createConversationMutation, {
    onCompleted: data => {
      const conversation = data?.createConversation;

      navigation.navigate('FeedView', {
        conversationId: conversation?.id
      });
    }
  });

  const handlePressCard = user => {
    return createConversation({
      variables: {
        listUserId: [user?.id]
      }
    });
  };

  const renderListUser = useMemo(() => {
    return (
      <>
        {listUser && (
          <FlatList
            data={listUser}
            keyExtractor={(_, index) => index}
            renderItem={({ item, index }) => {
              return (
                <UserCard
                  key={index}
                  userInfo={item}
                  onPress={handlePressCard}
                />
              );
            }}
          />
        )}
      </>
    );
  }, [listUser]);

  return <View>{renderListUser}</View>;
};

export default Search;
