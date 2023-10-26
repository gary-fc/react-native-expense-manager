import React, { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../context/accounts/AccountsContext';
import AuthContext from '../context/auth/AuthContext';
import { RefreshControl, ScrollView } from 'react-native';

const DashboardTabScreen = () => {
  const { getAmountTotal, loadAccounts, amountTotal, accounts } = useContext(AccountsContext);
  const { userId } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    if (userId) {
      getAmountTotal(userId);
      loadAccounts(userId);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    // AsyncStorage.clear();
    if (userId) {
      getAmountTotal(userId);
      loadAccounts(userId);
    }
  }, [userId]);

  return (
    <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

    </ScrollView>
  );
};

export default DashboardTabScreen;
