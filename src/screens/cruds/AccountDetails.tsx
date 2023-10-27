import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from '@ui-kitten/components';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { useForm } from '../../hooks/useForm';

interface Props extends StackScreenProps<any, any> {

}

const AccountDetails = ({ route, navigation }: Props) => {
  const params = route.params.item;
  const { accountName, accountDescription, amount, onChange } = useForm({ accountName: params?.accountName || '', accountDescription: params?.description, amount: params?.amount });

  useEffect(() => {
    navigation.setOptions(
      {
        headerBackTitle: '',
        headerTitle: 'Detalles de cuenta',
      },
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={{ width: '90%' }}>
          <View style={{ height: 65, marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>
              Nombre
            </Text>

            <CustomTextInput
              defaultValue={accountName}
              placeholder="name"
              onChangeText={text => onChange(text, 'accountName')}
            />
          </View>

          <View style={{ height: 65, marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>
              Descripcion
            </Text>

            <CustomTextInput
              defaultValue={accountDescription}
              placeholder="Description"
              onChangeText={text => onChange(text, 'accountDescription')}
            />
          </View>

          <View style={{ height: 65, marginTop: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>
              Amount
            </Text>

            <CustomTextInput
              defaultValue={amount.toString()}
              disabled
              placeholder="$0.00"
              onChangeText={text => onChange(text, 'amount')}
            />
          </View>

          <Button style={{ marginTop: 20 }}>Update</Button>
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
export default AccountDetails;
