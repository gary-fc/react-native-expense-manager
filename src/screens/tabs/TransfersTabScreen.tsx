import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button, Card, Datepicker, IndexPath, Modal, Select, SelectItem } from '@ui-kitten/components';
import CustomTextInput from '../../components/shared/CustomTextInput';
import AuthContext from '../../context/auth/AuthContext';
import { useForm } from '../../hooks/useForm';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/selection.json';
import TransactionItem from '../../components/transactions/TransactionItem';
import { TransactionsContext } from '../../context/transactions/TransactionsContext';
import { AccountsContext } from '../../context/accounts/AccountsContext';
import { TransfersContext } from '../../context/transfers/TransfersContext';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const now = new Date();
const initialDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

const TransfersTabScreen = () => {
  const { transfers, loadTransfers, createTransfer } = useContext(TransfersContext);
  const { accounts } = useContext(AccountsContext);
  const { userId } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [accountIdSend, setAccountIdSend] = useState('');
  const [accountIdReceives, setAccountIdReceives] = useState('');
  const [selectedIndexAccountSend, setSelectedIndexAccountSend] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [selectedIndexAccountReceives, setSelectedIndexAccountReceives] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { amount, description, onChange } = useForm(
    {
      amount: '',
      description: '',
    },
  );

  useEffect(() => {
    if (userId) {
      loadTransfers(userId);
    }
  }, []);

  const onSelectedIndexAccountSendChange = selectedIndex => {
    setSelectedIndexAccountSend(selectedIndex);
    const account = accounts[selectedIndex.row];
    console.log('asdasdasdasdasassss');
    console.log(account.id);
    setAccountIdSend(account.id);
  };

  const onSelectedIndexAccountReceivesChange = selectedIndex => {
    setSelectedIndexAccountReceives(selectedIndex);
    const account = accounts[selectedIndex.row];
    console.log('asdasdasdasdasassss');
    console.log(account.id);
    setAccountIdReceives(account.id);
  };
  const onCreateTransaction = () => {
    if (userId) {
      createTransfer(
        accountIdSend,
        accountIdReceives,
        parseInt(amount),
        selectedDate,
        userId,
      );
    }
    setVisible(false);
  };
  const onRefresh = () => {
    setRefreshing(true);
    if (userId) {
      loadTransfers(userId);
    }
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ flex: 1, height: '100%', justifyContent: 'space-between' }}>
          <Button appearance="ghost" style={{ marginHorizontal: 20 }} onPress={() => setVisible(true)}>
            <Icon name={'plus'} />
          </Button>

          <FlatList style={{ marginHorizontal: 20, marginVertical: 20 }} data={transfers}
                    renderItem={({ item }) => <TransactionItem item={item} />} />
        </View>

        <Modal backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
               visible={visible}
               style={{ width: '90%', maxHeight: 200 }}
               onBackdropPress={() => setVisible(false)}>
          <Card>
            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Cuenta origen
              </Text>

              <Select selectedIndex={selectedIndexAccountSend}
                      onSelect={index => {
                        onSelectedIndexAccountSendChange(index);
                      }}>
                {accounts.map(account => (
                  <SelectItem title={account.accountName} />
                ))}
              </Select>
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Cuenta destino
              </Text>

              <Select selectedIndex={selectedIndexAccountReceives}
                      onSelect={index => {
                        onSelectedIndexAccountReceivesChange(index);
                      }}>
                {accounts.map(account => (
                  <SelectItem title={account.accountName} />
                ))}
              </Select>
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Amount
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="$"
                onChangeText={text => onChange(text, 'amount')}
              />
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Description
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="-"
                onChangeText={text => onChange(text, 'description')}
              />
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Fecha
              </Text>
              <Datepicker
                date={selectedDate}
                onSelect={nextDate => setSelectedDate(nextDate)}
              />
            </View>

            <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Button onPress={onCreateTransaction}>Crear</Button>
            </View>
          </Card>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransfersTabScreen;
