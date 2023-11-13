import { useContext } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { GlobalContext } from '../../context/GlobalContext';

import Avatar from '../../components/Avatar';

import {
  formatConversationName,
  getConversationImage
} from '../../utils/helper';

const FeedViewHeader = ({ route }) => {
  const { conversation } = route.params;
  const { user } = useContext(GlobalContext);

  return (
    <View
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <Avatar
        width={40}
        height={40}
        uri={getConversationImage(conversation, user?.id)}
      />
      <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '800' }}>
        {formatConversationName(conversation, user?.id)}
      </Text>
    </View>
  );
};

export default FeedViewHeader;
