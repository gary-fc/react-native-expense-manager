import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button, Card, IndexPath, Modal, Select, SelectItem } from '@ui-kitten/components';
import CustomTextInput from '../../components/shared/CustomTextInput';
import AuthContext from '../../context/auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { CategoriesContext } from '../../context/categories/CategoriesContext';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/selection.json';
import CategoryItem from '../../components/categories/CategoryItem';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const CategoriesTabScreen = () => {
  const { categories, createCategory, loadCategories } = useContext(CategoriesContext);
  const { userId } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [categoryType, setCategoryType] = useState<string>('EXPENSE');
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0),
  );
  const { categoryName, categoryIcon, categoryDescription, onChange } = useForm(
    {
      categoryName: '',
      categoryIcon: 'ss-default',
      categoryDescription: '',
      categoryType: '',
    },
  );


  useEffect(() => {
    if (userId) {
      loadCategories(userId);
      onChange('', 'categoryName');
      onChange('', 'categoryDescription');
      onChange('', 'categoryType');
    }
  }, []);

  const onSelectedIndexChange = selectedIndex => {
    setSelectedIndex(selectedIndex);
    if (selectedIndex.row === 0) {
      setCategoryType('EXPENSE');
    } else {
      setCategoryType('INCOME');
    }
  };
  const onCreateCategory = () => {
    if (userId) {
      createCategory(
        categoryName,
        categoryIcon,
        categoryDescription,
        categoryType,
        userId,
      );
    }
    setVisible(false);
  };
  const onRefresh = () => {
    setRefreshing(true);
    if (userId) {
      loadCategories(userId);
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

          <FlatList style={{ marginHorizontal: 20, marginVertical: 20 }} data={categories}
                    renderItem={({ item }) => <CategoryItem item={item} />} />
        </View>

        <Modal backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
               visible={visible}
               style={{ width: '90%', maxHeight: 200 }}
               onBackdropPress={() => setVisible(false)}>
          <Card>
            <View style={{ height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Categoria
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="Educacion"
                onChangeText={text => onChange(text, 'categoryName')}
              />
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Descripcion
              </Text>
              <CustomTextInput
                capitalize={'none'}
                placeholder="Cursos Online"
                onChangeText={text => onChange(text, 'categoryDescription')}
              />
            </View>

            <View style={{ marginTop: 10, height: 65, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold' }}>
                Tipo
              </Text>

              <Select selectedIndex={selectedIndex}
                      onSelect={index => {
                        onSelectedIndexChange(index);
                      }}>
                <SelectItem title="GASTO" />
                <SelectItem title="INGRESO" />
              </Select>
            </View>

            <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Button onPress={onCreateCategory}>Crear</Button>
            </View>
          </Card>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesTabScreen;
