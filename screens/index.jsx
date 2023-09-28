import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GlobalContext } from '../context/GlobalContext';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Chat from './Chat';

const Stack = createNativeStackNavigator();

const Screen = () => {
  const { user } = useContext(GlobalContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Stack.Screen name="Chat" component={Chat} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Screen;
