import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardTabScreen from '../screens/DashboardTabScreen';
import StatsTabScreen from '../screens/StatsTabScreen';
import AccountsTabScreen from '../screens/AccountsTabScreen';
import MoreTabScreen from '../screens/MoreTabScreen';
import { ThemeContext } from '../context/theme/ThemeContext';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}>
      <Tab.Screen
        options={{ title: 'Home' }}
        name="DashboardTabScreen"
        component={DashboardTabScreen}
      />
      <Tab.Screen
        options={{ title: 'Stats' }}
        name="StatsTabScreen"
        component={StatsTabScreen}
      />
      <Tab.Screen
        options={{ title: 'Accounts' }}
        name="AccountTabScreen"
        component={AccountsTabScreen}
      />
      <Tab.Screen
        options={{ title: 'More' }}
        name="MoreTabScreen"
        component={MoreTabScreen}
      />
    </Tab.Navigator>
  );
};
