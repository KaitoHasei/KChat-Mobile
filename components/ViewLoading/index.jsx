import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ViewLoading = () => {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ActivityIndicator animating={true} />
    </View>
  );
};

export default ViewLoading;
