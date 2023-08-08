import React from 'react';
import {Box, ScrollView, Text} from '@/core';
import {DarkModeOptionsDialog, PlusScreenHeader} from '@/components';
import {List} from 'react-native-paper';
import {useSettings, useToggle} from '@/hooks';
import {Constants} from '@/constants';
import {useTranslation} from 'react-i18next';

const PlusScreen = () => {
  const {t} = useTranslation();
  const [isDarkModeOptionsVisible, toggleIsDarkModeOptionVisible] = useToggle();
  const {appearance} = useSettings();
  return (
    <>
      <PlusScreenHeader />
      <ScrollView>
        <Box>
          <Text marginLeft={'m'}>{t('common:appearance')}</Text>
          <List.Item
            title={'Dark mode'}
            onPress={toggleIsDarkModeOptionVisible}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => (
              <Text>{t(Constants.DARK_MODE_OPTIONS[appearance])}</Text>
            )}
          />
        </Box>
      </ScrollView>
      <DarkModeOptionsDialog
        visible={isDarkModeOptionsVisible}
        onDismiss={toggleIsDarkModeOptionVisible}
      />
    </>
  );
};

export default PlusScreen;
