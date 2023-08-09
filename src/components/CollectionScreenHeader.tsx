import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Appbar} from 'react-native-paper';

const CollectionScreenHeader = (props: NativeStackHeaderProps) => {
  return (
    <Appbar.Header>
      {props.navigation.canGoBack() ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={props.options.title} />
      <Appbar.Action icon="pencil" />
    </Appbar.Header>
  );
};

export default CollectionScreenHeader;
