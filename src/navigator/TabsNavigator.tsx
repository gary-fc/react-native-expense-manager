import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardTabScreen from '../screens/tabs/DashboardTabScreen';
import StatsTabScreen from '../screens/StatsTabScreen';
import AccountsTabScreen from '../screens/tabs/AccountsTabScreen';
import MoreTabScreen from '../screens/MoreTabScreen';
import { ThemeContext } from '../context/theme/ThemeContext';
import CategoriesTabScreen from '../screens/tabs/CategoriesTabScreen';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../assets/selection.json';
import TransactionsScreen from '../screens/tabs/TransactionsTabScreen';
import TransactionsTabScreen from '../screens/tabs/TransactionsTabScreen';
import TransfersTabScreen from '../screens/tabs/TransfersTabScreen';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

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
                iconName = 'home';
                break;
              case 'StatsTabScreen':
                iconName = 'stats-bars';
                break;
              case 'AccountTabScreen':
                iconName = 'database';
                break;
              case 'MoreTabScreen':
                iconName = 'equalizer';
                break;
              case 'CategoriesTabScreen':
                iconName = 'menu';
                break;
              case 'TransactionsTabScreen':
                iconName = 'share';
                break;
              case 'TransfersTabScreen':
                iconName = 'flickr2';
                break;
            }

            return <Icon name={iconName} />;
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
      {/*<Tab.Screen*/}
      {/*  options={{ title: 'Stats' }}*/}
      {/*  name="StatsTabScreen"*/}
      {/*  component={StatsTabScreen}*/}
      {/*/>*/}
      <Tab.Screen
        options={{ title: 'Transfer' }}
        name="TransfersTabScreen"
        component={TransfersTabScreen}
      />
      <Tab.Screen
        options={{ title: 'Transaction' }}
        name="TransactionsTabScreen"
        component={TransactionsTabScreen}
      />
      <Tab.Screen
        options={{ title: 'Accounts' }}
        name="AccountTabScreen"
        component={AccountsTabScreen}
      />
      <Tab.Screen
        name="CategoriesTabScreen"
        component={CategoriesTabScreen}
        options={{ title: 'Categories' }}
      />
      {/*<Tab.Screen*/}
      {/*  options={{ title: 'More' }}*/}
      {/*  name="MoreTabScreen"*/}
      {/*  component={MoreTabScreen}*/}
      {/*/>*/}
    </Tab.Navigator>
  );
};
