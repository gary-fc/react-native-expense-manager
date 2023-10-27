import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/selection.json';
import { TRANSACTION_TYPES } from '../../utils/Const';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

interface TransactionItemProps {
  item: {
    id: string;
    transactionType: string;
    description: string;
    amount: number;
  };
  showItem: (item: any) => void;
}

const TransactionItem = ({item, showItem}: TransactionItemProps) => {
  const { id, transactionType, description, amount } = item;

  const getIconName = () => {
    switch (transactionType) {
      case 'EXPENSE':
        return 'folder-minus';
      case 'INCOME':
        return 'folder-plus';
      case 'EXPENSE_TRANSFER':
        return 'folder-minus';
      case 'INCOME_TRANSFER':
        return 'folder-plus';
      default:
        return 'stack';
    }
  };

  return (
    <Card>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Icon size={25} name={getIconName(transactionType)} />

        <View>
          <Text style={{ textAlign: 'center' }} appearance="default">{amount}</Text>
          <Text style={{ textAlign: 'center' }} appearance="hint">{TRANSACTION_TYPES[transactionType]}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => showItem(item)}>
            <Icon name={'eye'} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default TransactionItem;
