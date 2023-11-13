import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

import Avatar from '../../components/Avatar';

const UserCard = ({ userInfo, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#272a30'
      }}
      onPress={() => onPress(userInfo)}
    >
      <Avatar width={50} height={50} uri={userInfo?.image} />
      <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '500' }}>
        {userInfo?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default UserCard;
