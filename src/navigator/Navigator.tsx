import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import { ThemeContext } from '../context/theme/ThemeContext';
import AuthContext from '../context/auth/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { TabsNavigator } from './TabsNavigator';
import { AuthNavigator } from './AuthNavigator';
import AccountDetails from '../screens/cruds/AccountDetails';
import TransactionDetails from '../screens/cruds/TransactionDetails';

const Stack = createStackNavigator();

export const Navigator = () => {
  const { theme } = useContext(ThemeContext);
  const { status } = useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        {status !== 'authenticated' ? (
          <Stack.Screen options={{headerShown: false}} name="AuthNavigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen options={{headerShown: false}} name="TabsNavigator" component={TabsNavigator} />
        )}
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      </Stack.Navigator>
    </View>
  );
};
