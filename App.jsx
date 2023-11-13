import 'react-native-gesture-handler';
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import {
  PaperProvider,
  // MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme
} from 'react-native-paper';

import { GlobalProvider } from './context/GlobalContext';
import { client } from './apollo';

import Screen from './screens';

const {
  // LightTheme,
  DarkTheme
} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme
});

// const CombinedDefaultTheme = {
//   ...MD3LightTheme,
//   ...LightTheme,
//   colors: {
//     ...MD3LightTheme.colors,
//     ...LightTheme.colors
//   }
// }

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: '#8b68c5',
    surfaceVariant: 'rgba(255, 255, 255, 1)',
    onSurfaceVariant: 'rgba(255, 255, 255, 1)',
    outline: 'rgba(255, 255, 255, 1)',
    text: 'rgba(255, 255, 255, 1)'
  }
};

export default function App() {
  return (
    <GlobalProvider>
      <ApolloProvider client={client}>
        <PaperProvider theme={CombinedDarkTheme}>
          <SafeAreaProvider>
            <NavigationContainer theme={CombinedDarkTheme}>
              <Screen />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </ApolloProvider>
    </GlobalProvider>
  );
}
