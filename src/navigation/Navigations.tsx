import React from 'react';
import {RootStackParamList} from './types';
import MainTab from './MainTabs';
import {Appbar} from 'react-native-paper';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {RemoteBookDetailsHeader, SearchBooksScreenHeader} from '@/components';
import {RemoteBookDetailsScreen, SearchBooksScreen} from '@/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: Header,
      }}>
      <Stack.Screen
        name="main_tab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="search"
        component={SearchBooksScreen}
        options={{
          header: SearchBooksScreenHeader,
        }}
      />
      <Stack.Screen
        name="remote_book_details"
        component={RemoteBookDetailsScreen}
        options={{
          header: RemoteBookDetailsHeader,
        }}
      />
    </Stack.Navigator>
  );
};

const Header = (props: NativeStackHeaderProps) => (
  <Appbar.Header>
    {props.navigation.canGoBack() ? (
      <Appbar.BackAction onPress={props.navigation.goBack} />
    ) : null}

    <Appbar.Content title={props.options.title} />
  </Appbar.Header>
);

export default Navigations;
