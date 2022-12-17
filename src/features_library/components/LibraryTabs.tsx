import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {BooksTab, CollectionsTab} from '..';
import {useAppTheme} from '../../shared/hooks';
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

function LibraryTabs() {
  const {colors, textVariants, borderRadii, sizes} = useAppTheme();
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {elevation: 0, backgroundColor: colors.background},
        tabBarLabelStyle: textVariants.titleSmall,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarIndicatorStyle: {
          height: sizes.tabIndicator,
          borderTopEndRadius: borderRadii.hg,
          borderTopStartRadius: borderRadii.hg,
        },
      }}>
      <Tab.Screen
        name="Books"
        component={BooksTab}
        options={{
          title: t('library:books'),
        }}
      />
      <Tab.Screen
        name="Collections"
        component={CollectionsTab}
        options={{title: t('library:collections')}}
      />
    </Tab.Navigator>
  );
}

export default LibraryTabs;
