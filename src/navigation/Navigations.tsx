import React from 'react';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import {Header, LibraryScreen} from '../features_library';
import {SearchScreen} from '../features_search';
import {BookDetailsScreen} from '../features_book_details';
import {useAppTheme} from '../shared/hooks';

const Stack = createStackNavigator<RootStackParamList>();

const Navigations = () => {
  const {colors} = useAppTheme();
  return (
    <Stack.Navigator
      initialRouteName="library"
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="library"
        component={LibraryScreen}
        options={{header: () => <Header />}}
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

export default Navigations;
