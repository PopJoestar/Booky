import React from 'react';
import {RootStackParamList} from './types';
import {SearchScreen} from '../features_search';
import {BookDetailsScreen} from '../features_book_details';
import {useAppTheme} from '../shared/hooks';
import MainTab from './MainTabs';
import {Appbar} from 'react-native-paper';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

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
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book_details"
        component={BookDetailsScreen}
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
