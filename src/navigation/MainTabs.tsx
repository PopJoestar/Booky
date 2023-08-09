import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MainTabParamList} from './types';
import {useTranslation} from 'react-i18next';
import {CollectionsScreen, LibraryScreen, PlusScreen} from '@/screens';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

function MainTab() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          tabBarIcon: 'book-open',

          title: t('library:title'),
        }}
      />
      <Tab.Screen
        name="collections"
        component={CollectionsScreen}
        options={{
          tabBarIcon: 'book-multiple',
          title: t('collection:title'),
        }}
      />
      <Tab.Screen
        name="settings"
        component={PlusScreen}
        options={{
          tabBarIcon: 'dots-horizontal',
          title: t('more'),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
