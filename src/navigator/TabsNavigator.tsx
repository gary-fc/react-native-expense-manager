import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardTabScreen from '../screens/DashboardTabScreen';
import StatsTabScreen from '../screens/StatsTabScreen';
import AccountsTabScreen from '../screens/AccountsTabScreen';
import MoreTabScreen from '../screens/MoreTabScreen';
import { ThemeContext } from '../context/theme/ThemeContext';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) =>
        ({
          tabBarIcon: ({ color }) => {
            let iconName: string = '';
            switch (route.name) {
              case 'DashboardTabScreen':
                iconName = 'H';
                break;
              case 'StatsTabScreen':
                iconName = 'S';
                break;
              case 'AccountTabScreen':
                iconName = 'A';
                break;
              case 'MoreTabScreen':
                iconName = 'M';
                break;
            }

            return <Text style={{ color: color }}>{iconName}</Text>;
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
        } as any)
      }>
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
