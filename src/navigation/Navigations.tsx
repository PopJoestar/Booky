import React from 'react';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import {Header, LibraryScreen} from '../features_library';

const Stack = createStackNavigator<RootStackParamList>();

const Navigations = () => {
  return (
    <Stack.Navigator
      initialRouteName="library"
      screenOptions={{
        headerShadowVisible: false,
        header: () => <Header />,
      }}>
      <Stack.Screen
        name="library"
        component={LibraryScreen}
        options={{headerTitle: 'Library'}}
      />
    </Stack.Navigator>
  );
};

export default Navigations;
