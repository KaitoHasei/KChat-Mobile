import { useContext, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { GlobalContext } from '../../context/GlobalContext';

import Avatar from '../Avatar';

import {
  formatConversationName,
  getConversationImage,
  getTimeFromUTCToGMT
} from '../../utils/helper';

const Conversation = ({ conversation, onPress }) => {
  const { user } = useContext(GlobalContext);

  const handlePressConversation = () => onPress(conversation);

  const renderConversation = useMemo(() => {
    const imageConversation = getConversationImage(conversation, user?.id);
    const conversationName = formatConversationName(conversation, user?.id);
    const haveSeenLastestMessage = conversation?.userIdsHaveSeen?.includes(
      user?.id
    );

    return (
      <>
        <Avatar width={55} height={55} uri={imageConversation} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text
            style={[
              {
                fontWeight: '600',
                fontSize: 15,
                color: '#ffffff',
                opacity: 0.65
              },
              !haveSeenLastestMessage && { fontWeight: '800', opacity: 1 }
            ]}
            numberOfLines={1}
          >
            {conversationName}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text
              style={[
                {
                  flex: 1,
                  fontWeight: '600',
                  fontSize: 15,
                  color: '#ffffff',
                  opacity: 0.65
                },
                !haveSeenLastestMessage && { fontWeight: '800', opacity: 1 }
              ]}
              numberOfLines={1}
            >
              {conversation?.latestMessage?.content}
            </Text>
            <Text style={{ marginHorizontal: 5, fontSize: 15 }}>•</Text>
            <Text
              style={[
                {
                  fontWeight: '600',
                  fontSize: 15,
                  color: '#ffffff',
                  opacity: 0.65
                },
                !haveSeenLastestMessage && { fontWeight: '800', opacity: 1 }
              ]}
            >
              {getTimeFromUTCToGMT(conversation?.latestMessage?.createdAt)}
            </Text>
          </View>
        </View>
      </>
    );
  }, [user, conversation]);

  return (
    <TouchableOpacity
      style={{
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
      onPress={handlePressConversation}
    >
      {renderConversation}
    </TouchableOpacity>
  );
};

export default Conversation;
