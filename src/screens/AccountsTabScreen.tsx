import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { AccountsContext } from '../context/accounts/AccountsContext';
import AuthContext from '../context/auth/AuthContext';

const AccountsTabScreen = () => {
  const { getAmountTotal } = useContext(AccountsContext);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    console.log('asdasd');
    if (userId) {
      getAmountTotal(userId);
    }
  }, [userId]);

  return (
    <>
      <Text>AccountsTabScreen</Text>
    </>
  );
};

export default AccountsTabScreen;
