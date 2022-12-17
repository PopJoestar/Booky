import React from 'react';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import {Header, LibraryScreen} from '../features_library';
import {SearchScreen} from '../features_search';

const Stack = createStackNavigator<RootStackParamList>();

const Navigations = () => {
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
          headerTitle: 'Library',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigations;
