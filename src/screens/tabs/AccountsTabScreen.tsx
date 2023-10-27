import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { AccountsContext } from '../../context/accounts/AccountsContext';
import AuthContext from '../../context/auth/AuthContext';
import AccountItem from '../../components/account/AccountItem';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { useForm } from '../../hooks/useForm';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/selection.json';
import { StackScreenProps } from '@react-navigation/stack';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

interface Props extends StackScreenProps<any, any> {
};

const AccountsTabScreen = ({ navigation }: Props) => {
  const { getAmountTotal, createAccount, loadAccounts, accounts } = useContext(AccountsContext);
  const { userId } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const { accountName, description, amount, onChange } = useForm({ accountName: '', description: '', amount: '' });

  const onCreateAccount = () => {
    if (userId) {
      createAccount(accountName, description, parseInt(amount), userId);
    }

    setVisible(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAccounts(userId);
    setRefreshing(false);
  };

  useEffect(() => {
    if (userId) {
      getAmountTotal(userId);
    }
  }, [userId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{ flex: 1, height: '100%', justifyContent: 'space-between' }}>
          <Button appearance="ghost" style={{ marginHorizontal: 20 }} onPress={() => setVisible(true)}>
            <Icon name={'plus'} />
          </Button>

          <FlatList style={{ marginHorizontal: 20, marginVertical: 20 }} data={accounts}
                    renderItem={({ item }) => <AccountItem item={item} showItem={item => {
                      navigation.navigate('AccountDetails', { item });
                    }} />} />
        </View>

        <Modal backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
               visible={visible}
               style={{ width: '90%', maxHeight: 200 }}
               onBackdropPress={() => setVisible(false)}>
          <Card>
            <View style={{ height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Nombre de cuenta
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="Bank Account"
                onChangeText={text => onChange(text, 'accountName')}
              />
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Descripcion
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="Salary"
                onChangeText={text => onChange(text, 'description')}
              />
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Monto
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="0"
                onChangeText={text => onChange(text, 'amount')}
              />
            </View>

            <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Button onPress={onCreateAccount}>Crear</Button>
            </View>
          </Card>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountsTabScreen;
