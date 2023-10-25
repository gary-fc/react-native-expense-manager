import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import { ThemeContext } from '../context/theme/ThemeContext';
import AuthContext from '../context/auth/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { TabsNavigator } from './TabsNavigator';
import { AuthNavigator } from './AuthNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {
  const { theme } = useContext(ThemeContext);
  const { status } = useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        {status !== 'authenticated' ? (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="TabsNavigator" component={TabsNavigator} />
        )}
      </Stack.Navigator>
    </View>
  );
};
