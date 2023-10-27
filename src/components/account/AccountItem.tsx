import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

interface AccountItemProps {
  item: {
    accountName: string;
    description: string;
    amount: number;
  };
  showItem: (item: any) => void;
}

const AccountItem = (accountItemProps: AccountItemProps) => {
  const { accountName, description, amount } = accountItemProps.item;

  return (
    <Card>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Icon name="database" />

        <View>
          <Text style={{ textAlign: 'center' }} appearance="hint">{accountName}</Text>
          <Text style={{ textAlign: 'center' }} appearance="default">{amount}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => accountItemProps.showItem(accountItemProps.item)}>
            <Icon name={'eye'} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};


export default AccountItem;
