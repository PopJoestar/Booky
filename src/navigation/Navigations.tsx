import React from 'react';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import {LibraryScreen} from '../features_library';

const Stack = createStackNavigator<RootStackParamList>();

const Navigations = () => {
  return (
    <Stack.Navigator
      initialRouteName="library"
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
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
