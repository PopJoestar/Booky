import React from 'react';
import {useTranslation} from 'react-i18next';
import {Appbar} from 'react-native-paper';

const CollectionScreenHeader = () => {
  const {t} = useTranslation();

  return (
    <Appbar.Header>
      <Appbar.Content title={t('collection:title')} />
    </Appbar.Header>
  );
};

export default CollectionScreenHeader;
