import React from 'react';
import { Button, Icon, IconElement, ListItem } from '@ui-kitten/components';

const AccountItem = ({ item } ) => {
  console.log(item)

  const { accountName, description, amount } = item.item;
  const renderItemIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name="person"
    />
  );

  const renderItemOptions = (props: any): IconElement => (
    <Button
      appearance="ghost"
      accessoryLeft={() => <Icon {...props} name="more-vertical" />}
    />
  );

  return (
    <ListItem
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemOptions}
      title={accountName}
      description={amount.toString()}
    />
  );
};


export default AccountItem;
