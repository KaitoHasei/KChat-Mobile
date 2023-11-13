import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useQuery } from '@apollo/client';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

import { GlobalContext } from '../context/GlobalContext';
import queries from '../apollo/graphql';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Chat from './Chat';
import Search from './Search';
import FeedView from './Feed';

import SearchUser from '../modules/SearchUser';
import FeedViewHeader from '../modules/FeedViewHeader';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const getProfileQuery = queries.query.getProfile;

const AuthenticatedScreen = () => {
  const { setUser, setAuthenticated } = useContext(GlobalContext);

  const { loading } = useQuery(getProfileQuery, {
    onCompleted: data => {
      const profile = data?.getProfile;

      return setUser(profile);
    },
    onError: async error => {
      if (error.networkError.statusCode === 401) {
        await SecureStore.deleteItemAsync('access_token');
        return setAuthenticated(false);
      }
    },
    fetchPolicy: 'network-only'
  });

  return (
    <>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ route, navigation }) => ({
              headerLeft: () => (
                <IconButton
                  icon="logout"
                  size={20}
                  iconColor="red"
                  onPress={() => {
                    SecureStore.deleteItemAsync('access_token');
                    setAuthenticated(false);
                  }}
                />
              ),
              headerRight: () => (
                <IconButton
                  icon="account-search"
                  onPress={() => navigation.navigate('Search')}
                />
              )
            })}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={({ route, navigation }) => ({
              headerTitleAlign: 'left',
              headerTitle: () => <SearchUser navigation={navigation} />
            })}
          />
          <Stack.Screen
            name="FeedView"
            component={FeedView}
            options={({ route }) => ({
              headerTitle: () => <FeedViewHeader route={route} />
            })}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

const Screen = () => {
  const { isAuthenticated } = useContext(GlobalContext);

  return (
    <>
      {isAuthenticated ? (
        <AuthenticatedScreen />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Screen;
