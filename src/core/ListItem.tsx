import React from 'react';
import {List, ListItemProps} from 'react-native-paper';

type Props = {
  title?: string;
  trailingIcon?: string;
  onPress?: (item?: any) => void;
};

const ListItem = ({title, trailingIcon, onPress}: Props) => {
  const renderTrailingIcon: ListItemProps['right'] = props => {
    if (trailingIcon === undefined) {
      return undefined;
    }

    return <List.Icon icon={trailingIcon} {...props} />;
  };
  return (
    <List.Item title={title} right={renderTrailingIcon} onPress={onPress} />
  );
};

export default ListItem;
