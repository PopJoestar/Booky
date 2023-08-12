import React, {useEffect, useState} from 'react';
import {Checkbox, Dialog, DialogProps} from 'react-native-paper';
import {Box, Button, ScrollView, Text} from '@/core';
import ColorPicker, {
  Preview,
  Swatches,
  SaturationSlider,
} from 'reanimated-color-picker';
import {useTranslation} from 'react-i18next';
import {useAppTheme, useSettings} from '@/hooks';
import {StyleSheet} from 'react-native';
import {useMaterial3ThemeContext} from '@/theme';

type Props = Omit<DialogProps, 'children'>;

const UpdateThemeDialog = ({onDismiss, visible, ...rest}: Props) => {
  const {spacing} = useAppTheme();
  const {updateSettings, theme} = useSettings();
  const [isDynamic, setIsDynamic] = useState(theme === 'dynamic');
  const {resetTheme, updateTheme} = useMaterial3ThemeContext();
  const [selectedColor, setSelectedColor] = useState(
    theme === undefined || theme === 'dynamic' ? '#AB47BC' : theme,
  );
  const {t} = useTranslation();

  useEffect(() => {
    setIsDynamic(theme === 'dynamic');
  }, [theme]);

  const _updateTheme = () => {
    if (isDynamic && theme !== 'dynamic') {
      resetTheme();
      updateSettings({theme: 'dynamic'});
    } else {
      updateTheme(selectedColor);
      updateSettings({theme: selectedColor});
    }

    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
      dismissable
      style={styles.dialog}
      dismissableBackButton
      {...rest}>
      <Dialog.Title>{t('appearance:theme.title')}</Dialog.Title>
      <Dialog.Content>
        <Text>{t('appearance:theme.dynamic_theme_notice')}</Text>
      </Dialog.Content>
      <Dialog.ScrollArea>
        <ScrollView>
          <Box rowGap={'s'} paddingBottom={'m'}>
            <Checkbox.Item
              label={t('appearance:theme.dynamic_color')}
              status={isDynamic ? 'checked' : 'unchecked'}
              onPress={() => setIsDynamic(!isDynamic)}
            />
            <ColorPicker
              style={[{rowGap: spacing.m}, styles.colorPicker]}
              value={selectedColor}
              onComplete={colors => {
                setSelectedColor(colors.hex);
              }}>
              <Preview hideInitialColor />
              <Swatches />
              <SaturationSlider boundedThumb={true} />
            </ColorPicker>
          </Box>
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t('common:dismiss')}</Button>
        <Button onPress={_updateTheme}>{t('common:confirm')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  colorPicker: {alignSelf: 'center'},
  dialog: {maxHeight: '90%', bottom: 40},
});

export default UpdateThemeDialog;
