import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import Avatar from '../../components/Avatar';

const Message = ({
  message,
  sender,
  isOwner,
  previousSameUser,
  nextSameUser
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          marginBottom: 5,
          display: 'flex',
          alignItems: 'flex-end'
        },
        isOwner
          ? { justifyContent: 'flex-start', flexDirection: 'row-reverse' }
          : { justifyContent: 'flex-start', flexDirection: 'row' }
      ]}
    >
      <Avatar
        style={[{ marginHorizontal: 10 }, previousSameUser && { height: 0 }]}
        width={30}
        height={30}
        uri={sender?.image}
      />
      <Text
        style={[
          { maxWidth: '70%', padding: 8 },
          isOwner
            ? { backgroundColor: theme.colors.primary }
            : { backgroundColor: '#ffffff3d' },
          previousSameUser === nextSameUser
            ? { borderRadius: 8 }
            : !previousSameUser && nextSameUser
            ? {
                borderTopRightRadius: 2,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8
              }
            : {
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 2
              }
        ]}
      >
        {message?.content}
      </Text>
    </View>
  );
};

export default Message;
