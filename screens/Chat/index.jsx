import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import { TEST_ENV } from '@env';

import styles from './ChatStyles';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text>{TEST_ENV}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Chat;
