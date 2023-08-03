import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Appbar} from 'react-native-paper';

const LibraryScreenHeader = () => {
  const {t} = useTranslation();

  const navigation = useNavigation();

  const goToSearchScreen = () => {
    navigation.navigate('search');
  };

  return (
    <Appbar.Header>
      <Appbar.Content title={t('library:title')} />
      <Appbar.Action icon="magnify" onPress={goToSearchScreen} />
      <Appbar.Action icon="filter-variant" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default LibraryScreenHeader;
