import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/auth/AuthContext';
import { ThemeProvider } from './src/context/theme/ThemeContext';
import { Navigator } from './src/navigator/Navigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AccountsProvider } from './src/context/accounts/AccountsContext';
import { CategoriesProvider } from './src/context/categories/CategoriesContext';
import { TransactionsProvider } from './src/context/transactions/TransactionsContext';
import { TransfersProvider } from './src/context/transfers/TransfersContext';

const AppState = ({ children }: any) => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthProvider>
          <CategoriesProvider>
            <AccountsProvider>
              <TransactionsProvider>
                <TransfersProvider>
                  <ThemeProvider>{children}</ThemeProvider>
                </TransfersProvider>
              </TransactionsProvider>
            </AccountsProvider>
          </CategoriesProvider>
        </AuthProvider>
      </ApplicationProvider>
    </>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};
export default App;
