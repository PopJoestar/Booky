import {Constants} from '@/constants';
import {Box, Button, ScrollView, Text} from '@/core';
import {useAppTheme, useSettings} from '@/hooks';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Dialog, DialogProps, RadioButton} from 'react-native-paper';

type Props = {} & Omit<DialogProps, 'children'>;

const DarkModeOptionsDialog = ({onDismiss, visible, ...rest}: Props) => {
  const {t} = useTranslation();
  const {spacing} = useAppTheme();

  const {appearance, updateSettings} = useSettings();

  const [selectedAppearanceIndex, setSelectedAppearanceIndex] =
    useState(appearance);

  const updateAppearance = () => {
    updateSettings({appearance: selectedAppearanceIndex});
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
      dismissable
      dismissableBackButton
      {...rest}>
      <Dialog.Title>{t('appearance:dark_mode.title')}</Dialog.Title>
      <Dialog.Content>
        <Text>{t('appearance:dark_mode.notice')}</Text>
      </Dialog.Content>
      <Dialog.ScrollArea>
        <ScrollView>
          <RadioButton.Group
            value={selectedAppearanceIndex.toString()}
            onValueChange={selected => {
              setSelectedAppearanceIndex(parseInt(selected, 10));
            }}>
            <Box>
              {Constants.DARK_MODE_OPTIONS.map((option, index) => (
                <RadioButton.Item
                  key={index}
                  position="leading"
                  label={t(option)}
                  labelStyle={[
                    styles.radioButtonLabel,
                    {marginLeft: spacing.s},
                  ]}
                  value={index.toString()}
                />
              ))}
            </Box>
          </RadioButton.Group>
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t('common:dismiss')}</Button>
        <Button onPress={updateAppearance}>{t('common:confirm')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  radioButtonLabel: {textAlign: 'left'},
});

export default DarkModeOptionsDialog;
