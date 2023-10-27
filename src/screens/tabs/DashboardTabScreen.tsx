import React, { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../../context/accounts/AccountsContext';
import AuthContext from '../../context/auth/AuthContext';
import { FlatList, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { Card, RangeDatepicker, Text } from '@ui-kitten/components';
import AccountItem from '../../components/account/AccountItem';
import { TransactionsContext } from '../../context/transactions/TransactionsContext';
import TransactionItem from '../../components/transactions/TransactionItem';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {
};

const DashboardTabScreen = ({ navigation }: Props) => {
  const { getAmountTotal, loadAccounts, amountTotal, accounts } = useContext(AccountsContext);
  const { loadTransactions, loadTransactionsPeriod, transactions, transactionsPeriod } = useContext(TransactionsContext);
  const { userId } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [range, setRange] = React.useState({});

  useEffect(() => {
    console.log(range.startDate);
    if (range.startDate && range.endDate) {
      loadTransactionsPeriod(userId, range.startDate.toISOString(), range.endDate.toISOString());
    }
  }, [range]);

  const onRefresh = () => {
    setRefreshing(true);
    if (userId) {
      getAmountTotal(userId);
      loadAccounts(userId);
      loadTransactions(userId);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    // AsyncStorage.clear();
    if (userId) {
      getAmountTotal(userId);
      loadAccounts(userId);
      loadTransactions(userId);
    }
  }, [userId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ marginHorizontal: 40, flex: 1 }}>
          <Text style={{ marginVertical: 20 }} appearance="default">Monto total de cuentas</Text>

          <Card>
            <Text style={{ textAlign: 'center' }}>{amountTotal} Bs.</Text>
          </Card>
        </View>

        <View style={{ marginHorizontal: 40, marginTop: 20 }}>
          <Text>Cuentas</Text>
        </View>

        <Card
          style={{ marginHorizontal: 40, marginVertical: 20, minHeight: 250, maxHeight: 250 }}>
          <FlatList
            nestedScrollEnabled={false}
            data={accounts}
            renderItem={({ item }) => (
              <AccountItem
                item={item}
                showItem={item => {
                  navigation.navigate('AccountDetails', { item });
                }}
              />
            )}
          />
        </Card>

        <View style={{ marginHorizontal: 40, marginTop: 20 }}>
          <Text>Ultimos movimientos</Text>
        </View>

        <Card
          style={{ marginHorizontal: 40, marginVertical: 20, minHeight: 250, maxHeight: 250 }}>
          <FlatList nestedScrollEnabled={false}
            data={transactions}
            renderItem={({ item }) => (
              <TransactionItem
                item={item}
                showItem={item =>
                  navigation.navigate('TransactionDetails', { item })
                }
              />
            )}
          />
        </Card>

        <View style={{ marginHorizontal: 40, marginTop: 20 }}>
          <Text>Balance</Text>
        </View>

        <Card
          style={{ marginHorizontal: 40, marginVertical: 20, minHeight: 250, maxHeight: 250 }}>

          <RangeDatepicker
            range={range}
            onSelect={nextRange => setRange(nextRange)}
          />

          <FlatList nestedScrollEnabled={false}
                    data={transactionsPeriod}
                    renderItem={({ item }) => (
                      <TransactionItem
                        item={item}
                        showItem={item =>
                          navigation.navigate('TransactionDetails', { item })
                        }
                      />
                    )}
          />
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardTabScreen;
