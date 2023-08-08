import React from 'react';
import {Box, Icon, Row, ScrollView, Text} from '@/core';
import {
  DarkModeOptionsDialog,
  PlusScreenHeader,
  UpdateThemeDialog,
} from '@/components';
import {List, Portal} from 'react-native-paper';
import {useAppTheme, useSettings, useToggle} from '@/hooks';
import {Constants} from '@/constants';
import {useTranslation} from 'react-i18next';

const PlusScreen = () => {
  const {sizes} = useAppTheme();
  const {t} = useTranslation();
  const [isDarkModeOptionsVisible, toggleIsDarkModeOptionVisible] = useToggle();
  const [isUpdateThemeDialogVisible, toggleIsUpdateThemeDialogVisible] =
    useToggle();

  const {appearance, theme} = useSettings();
  return (
    <>
      <PlusScreenHeader />
      <ScrollView>
        <List.Section>
          <List.Subheader>{t('common:appearance')}</List.Subheader>
          <List.Item
            title={t('common:dark_mode')}
            onPress={toggleIsDarkModeOptionVisible}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => (
              <Icon name="theme-light-dark" {...props} size={sizes.l} />
            )}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => (
              <Text>{t(Constants.DARK_MODE_OPTIONS[appearance])}</Text>
            )}
          />
          <List.Item
            title={t('common:theme.title')}
            onPress={toggleIsUpdateThemeDialogVisible}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => (
              <Icon name="palette-outline" {...props} size={sizes.l} />
            )}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => (
              <Row alignItems={'center'}>
                {theme !== 'dynamic' ? (
                  <Box
                    height={15}
                    width={15}
                    style={{backgroundColor: theme}}
                  />
                ) : null}
                <Text marginLeft={'s'} textTransform={'capitalize'}>
                  {theme}
                </Text>
              </Row>
            )}
          />
        </List.Section>
      </ScrollView>
      <Portal>
        <DarkModeOptionsDialog
          visible={isDarkModeOptionsVisible}
          onDismiss={toggleIsDarkModeOptionVisible}
        />

        <UpdateThemeDialog
          visible={isUpdateThemeDialogVisible}
          onDismiss={toggleIsUpdateThemeDialogVisible}
        />
      </Portal>
    </>
  );
};

export default PlusScreen;
