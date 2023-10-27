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
import { StackScreenProps } from '@react-navigation/stack';
import { CategoriesContext } from '../../context/categories/CategoriesContext';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const now = new Date();
const initialDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

interface Props extends StackScreenProps<any, any> {
};

const TransactionsTabScreen = ({ navigation }: Props) => {
  const { transactions, loadTransactions, createTransaction } = useContext(TransactionsContext);
  const {accounts,getAmountTotal} = useContext(AccountsContext);
  const { categories } = useContext(CategoriesContext);
  const { userId } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<string>('EXPENSE');
  const [accountId, setAccountId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedIndexType, setSelectedIndexType] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [selectedIndexCategory, setSelectedIndexCategory] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [selectedIndexAccount, setSelectedIndexAccount] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { amount, description, onChange } = useForm(
    {
      amount: '',
      description: '',
    },
  );

  useEffect(() => {
    if (userId) {
      loadTransactions(userId);
    }
  }, []);

  const onSelectedIndexTypeChange = selectedIndex => {
    setSelectedIndexType(selectedIndex);
    if (selectedIndex.row === 0) {
      setTransactionType('EXPENSE');
    } else {
      setTransactionType('INCOME');
    }
  };

  const onSelectedIndexAccountChange = selectedIndex => {
    setSelectedIndexAccount(selectedIndex);
    const account = accounts[selectedIndex.row];
    setAccountId(account.id);
  };

  const onSelectedIndexCategoryChange = selectedIndex => {
    console.log(selectedIndex)
    setSelectedIndexCategory(selectedIndex);
    const category = categories[selectedIndex.row];
    console.log(category)
    setCategoryId(category.id);
  };
  const onCreateTransaction = () => {
    if (userId) {
      createTransaction(
        accountId,
        userId,
        categoryId,
        description,
        transactionType,
        selectedDate,
        parseInt(amount),
      );
      getAmountTotal(userId);
    }
    setVisible(false);
  };
  const onRefresh = () => {
    setRefreshing(true);
    if (userId) {
      loadTransactions(userId);
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

          <FlatList style={{ marginHorizontal: 20, marginVertical: 20 }} data={transactions}
            renderItem={({ item }) => (
              <TransactionItem
                item={item}
                showItem={item =>
                  navigation.navigate('TransactionDetails', { item })
                }
              />
            )}
          />
        </View>

        <Modal backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
               visible={visible}
               style={{ width: '90%', maxHeight: 200 }}
               onBackdropPress={() => setVisible(false)}>
          <Card>
            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Cuenta
              </Text>

              <Select selectedIndex={selectedIndexAccount}
                      onSelect={index => {
                        onSelectedIndexAccountChange(index);
                      }}>
                {accounts.map(account => (
                  <SelectItem title={account.accountName} />
                ))}
              </Select>
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Tipo
              </Text>

              <Select selectedIndex={selectedIndexType}
                      onSelect={index => {
                        onSelectedIndexTypeChange(index);
                      }}>
                <SelectItem title="GASTO" />
                <SelectItem title="INGRESO" />
              </Select>
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Categoria
              </Text>

              <Select selectedIndex={selectedIndexCategory}
                      onSelect={index => {
                        onSelectedIndexCategoryChange(index);
                      }}>
                {categories.map(category => (
                  <SelectItem title={category.categoryName} />
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

export default TransactionsTabScreen;
