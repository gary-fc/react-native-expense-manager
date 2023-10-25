import React from 'react';
import { Text } from 'react-native';
import { Card, Layout, List } from '@ui-kitten/components';
import AccountItem from '../components/dashboard/AccountItem';

const AccountsTabScreen = () => {
  return (
    <Layout style={{ flex: 1 }} level="2">
      <Card status="success">
        <Text style={{ textAlign: 'center' }}>100$</Text>
      </Card>

      <Card>
        <List data={[]} renderItem={AccountItem} style={{ height: 100 }} />
      </Card>
    </Layout>
  );
};

export default AccountsTabScreen;
