import React from 'react';
import { Card, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const CategoryItem = ({ item }) => {
  const { categoryName, categoryIcon, categoryDescription, categoryType } = item;

  return (
    <Card>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Icon size={25} name={categoryType === 'EXPENSE' ? 'move-down' : 'move-up'} />

        <View>
          <Text style={{ textAlign: 'center' }} appearance="hint">{categoryName}</Text>
          <Text style={{ textAlign: 'center' }} appearance="default">{categoryDescription}</Text>
        </View>

        <View>
          <TouchableOpacity>
            <Icon name={'pencil'} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};


export default CategoryItem;
