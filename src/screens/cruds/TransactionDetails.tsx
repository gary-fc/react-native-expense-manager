import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Datepicker } from '@ui-kitten/components';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { useForm } from '../../hooks/useForm';
import { TRANSACTION_TYPES } from '../../utils/Const';
import { TransactionsContext } from '../../context/transactions/TransactionsContext';

const TransactionDetails = ({ navigation, route }) => {
  const params = route.params.item;
  console.log("params");
  console.log(params);
  const { amount,transactionDescription, transactionType, onChange } = useForm({ amount: params?.amount,transactionDescription: params.transactionDescription ,transactionType: params?.transactionType });
  const {updateTransaction} = useContext(TransactionsContext);
  const [selectedDate, setSelectedDate] = useState(new Date(params.date));
  const [id, setId] = useState(params.id);

  useEffect(() => {
    navigation.setOptions(
      {
        headerBackTitle: '',
        headerTitle: 'Detalles de transaccion',
      },
    );
  }, []);

  const onUpdateTransaction = () => {
    updateTransaction(id, transactionDescription, selectedDate, parseInt(amount));
    navigation.pop();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={{ width: '90%' }}>
          <View style={{ height: 65, marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>
              Amount
            </Text>

            <CustomTextInput
              defaultValue={amount.toString()}
              placeholder="$0.00"
              onChangeText={text => onChange(text, 'amount')}
            />
          </View>

          <View style={{ height: 65, marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>
              Tipo
            </Text>

            <CustomTextInput
              defaultValue={TRANSACTION_TYPES[transactionType]}
              disabled
              placeholder="$0.00"
              onChangeText={text => onChange(text, 'amount')}
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

          <Button style={{ marginTop: 20 }} onPress={onUpdateTransaction}>Update</Button>

          <Button status="danger" style={{ marginTop: 20 }}>Delete</Button>
        </Card>
      </View>
    </ScrollView>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TransactionDetails;
