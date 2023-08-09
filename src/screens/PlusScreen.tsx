import React from 'react';
import {Chip, ScrollView} from '@/core';
import {
  DarkModeOptionsDialog,
  PlusScreenHeader,
  UpdateThemeDialog,
} from '@/components';
import {List, Portal} from 'react-native-paper';
import {useAppTheme, useSettings, useToggle} from '@/hooks';
import {Constants} from '@/constants';
import {useTranslation} from 'react-i18next';
import {colorKit} from 'reanimated-color-picker';
import {useMaterial3ThemeContext} from '@/theme';
import {nativeApplicationVersion} from 'expo-application';

const PlusScreen = () => {
  const {colors} = useAppTheme();
  const {isDark} = useMaterial3ThemeContext();
  const {t} = useTranslation();
  const [isDarkModeOptionsVisible, toggleIsDarkModeOptionVisible] = useToggle();
  const [isUpdateThemeDialogVisible, toggleIsUpdateThemeDialogVisible] =
    useToggle();

  const {appearance, theme} = useSettings();

  const getThemeTextColor = () => {
    if (theme === 'dynamic' || theme === undefined) {
      return colors.onSurface;
    }

    const isThemeColorDark = colorKit.isDark(theme);

    if (isThemeColorDark && isDark) {
      return colors.onSurface;
    }

    return colors.inverseOnSurface;
  };
  return (
    <>
      <PlusScreenHeader />
      <ScrollView>
        {/* Général */}
        <List.Section>
          <List.Subheader>{t('general')}</List.Subheader>
          <List.Item
            title={t('language')}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => <List.Icon icon="translate" {...props} />}
            description={'English'}
          />
          <List.Item
            title={t('Version')}
            description={nativeApplicationVersion}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => <List.Icon icon="alpha-v-box-outline" {...props} />}
          />
        </List.Section>

        {/* Appearance */}
        <List.Section>
          <List.Subheader>{t('appearance:title')}</List.Subheader>
          <List.Item
            title={t('appearance:dark_mode.title')}
            onPress={toggleIsDarkModeOptionVisible}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => <List.Icon icon="theme-light-dark" {...props} />}
            description={t(Constants.DARK_MODE_OPTIONS[appearance])}
          />
          <List.Item
            title={t('appearance:theme.title')}
            onPress={toggleIsUpdateThemeDialogVisible}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => <List.Icon icon="palette-outline" {...props} />}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => (
              <Chip
                style={
                  theme !== 'dynamic'
                    ? {
                        backgroundColor: theme,
                      }
                    : undefined
                }
                // eslint-disable-next-line react-native/no-inline-styles
                textStyle={{
                  color: getThemeTextColor(),
                  textTransform: 'capitalize',
                }}>
                {theme}
              </Chip>
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
