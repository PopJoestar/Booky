import React from 'react';
import {Chip, Image, ScrollView} from '@/core';
import {
  DarkModeOptionsDialog,
  UpdateLanguageDialog,
  UpdateThemeDialog,
} from '@/components';
import {List, Portal} from 'react-native-paper';
import {useAppTheme, useSettings, useToggle} from '@/hooks';
import {Constants} from '@/constants';
import {useTranslation} from 'react-i18next';
import {colorKit} from 'reanimated-color-picker';
import {useMaterial3ThemeContext} from '@/theme';
import {nativeApplicationVersion} from 'expo-application';
import {Linking} from 'react-native';

const PlusScreen = () => {
  const {colors} = useAppTheme();
  const {isDark} = useMaterial3ThemeContext();
  const {t} = useTranslation();
  const [isDarkModeOptionsVisible, toggleIsDarkModeOptionVisible] = useToggle();
  const [isUpdateLanguageVisible, toggleIsUpdateLanguageVisible] = useToggle();

  const [isUpdateThemeDialogVisible, toggleIsUpdateThemeDialogVisible] =
    useToggle();

  const {appearance, theme, language} = useSettings();

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

  const goToCodeRepo = async () => {
    await Linking.openURL(Constants.CODE_REPOSITORY);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/Booky.png')}
          height={75}
          width={75}
          alignSelf={'center'}
          marginTop={'tabsHeader'}
        />
        {/* Général */}
        <List.Section>
          <List.Subheader>{t('general')}</List.Subheader>
          <List.Item
            title={t('common:language')}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => <List.Icon icon="translate" {...props} />}
            description={t(
              Constants.AVAILABLE_LANGUAGE.find(lng => lng.value === language)!
                .label,
            )}
            onPress={toggleIsUpdateLanguageVisible}
          />
          <List.Item
            title={t('common:code_repo')}
            onPress={goToCodeRepo}
            description={Constants.CODE_REPOSITORY}
            // eslint-disable-next-line react/no-unstable-nested-components
            left={props => <List.Icon icon="source-repository" {...props} />}
          />
          <List.Item
            title={t('common:version')}
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
        <UpdateLanguageDialog
          visible={isUpdateLanguageVisible}
          onDismiss={toggleIsUpdateLanguageVisible}
        />
      </Portal>
    </>
  );
};

export default PlusScreen;
