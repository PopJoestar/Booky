import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {LibraryScreen} from '../features_library';
import {MainTabParamList} from './types';
import {useTranslation} from 'react-i18next';
import {Icon} from '../shared/components';
import {useAppTheme} from '../shared/hooks';
import {CollectionsScreen} from '../features_collection';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

function MainTab() {
  const {t} = useTranslation();
  const {sizes} = useAppTheme();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <Icon name="book-open" size={sizes.l} color={color} />
            ) : (
              <Icon name="book-open-outline" size={sizes.l} color={color} />
            ),

          title: t('library:title'),
        }}
      />
      <Tab.Screen
        name="collections"
        component={CollectionsScreen}
        options={{
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <Icon name="book-multiple" size={sizes.l} color={color} />
            ) : (
              <Icon name="book-multiple-outline" size={sizes.l} color={color} />
            ),
          title: t('collection:title'),
        }}
      />
      <Tab.Screen
        name="settings"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <Icon name="dots-horizontal" size={sizes.l} color={color} />
            ) : (
              <Icon name="dots-horizontal" size={sizes.l} color={color} />
            ),
          title: t('more:title'),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
