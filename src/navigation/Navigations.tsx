import React from 'react';
import {RootStackParamList} from './types';
import {useAppTheme} from '../shared/hooks';
import MainTab from './MainTabs';
import {Appbar} from 'react-native-paper';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  RemoteBookDetailsScreen,
  SearchBooksScreen,
} from '@/features/search_book';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigations = () => {
  const {colors} = useAppTheme();
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="remote_book_details"
        component={RemoteBookDetailsScreen}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: colors.background},
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
