import React from 'react';
import { Card, Divider, Layout, List, Text } from '@ui-kitten/components';
import AccountItem from '../components/dashboard/AccountItem';
import TransactionItem from '../components/dashboard/TransactionItem';

const HeaderTotal = () => {
  return (
    <Card status="success">
      <Text appearance="hint">Total general amount</Text>
    </Card>
  );
};

const HeaderAccounts = () => {
  return (
    <Card status="success">
      <Text appearance="hint">Accounts</Text>
    </Card>
  );
};

const HeaderLastTransactions = () => {
  return (
    <Card status="success">
      <Text appearance="hint">Last Transactions</Text>
    </Card>
  );
};

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

const DashboardTabScreen = () => {
  return (
    <>
      <Layout style={{ flex: 1 }} level="2">
        <Card style={{ marginHorizontal: 20, marginTop: 20 }} header={HeaderTotal}>
          <Text>$ 400</Text>
        </Card>

        <Card style={{ marginHorizontal: 20, marginTop: 20 }} header={HeaderAccounts}>
          <List style={{ maxHeight: 200 }} data={data} renderItem={AccountItem} ItemSeparatorComponent={Divider} />
        </Card>

        <Card style={{ marginHorizontal: 20, marginTop: 20 }} header={HeaderLastTransactions}>
          <List style={{ maxHeight: 200 }} data={data} renderItem={TransactionItem} ItemSeparatorComponent={Divider} />
        </Card>
      </Layout>
    </>
  );
};

export default DashboardTabScreen;
