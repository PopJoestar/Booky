import {Constants} from '@/constants';
import {Box, Button, ScrollView} from '@/core';
import {useAppTheme, useSettings} from '@/hooks';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Dialog, DialogProps, RadioButton} from 'react-native-paper';

type Props = Omit<DialogProps, 'children'>;

const UpdateLanguageDialog = ({onDismiss, visible, ...rest}: Props) => {
  const {t} = useTranslation();
  const {spacing} = useAppTheme();

  const {updateSettings, language} = useSettings();

  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const updateLanguage = () => {
    updateSettings({language: selectedLanguage});
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
      <Dialog.Title>{t('common:language')}</Dialog.Title>

      <Dialog.ScrollArea>
        <ScrollView>
          <RadioButton.Group
            value={selectedLanguage}
            onValueChange={selected => {
              setSelectedLanguage(selected);
            }}>
            <Box>
              {Constants.AVAILABLE_LANGUAGE.map((option, index) => (
                <RadioButton.Item
                  key={index}
                  position="leading"
                  label={t(option.label)}
                  labelStyle={[
                    styles.radioButtonLabel,
                    {marginLeft: spacing.s},
                  ]}
                  value={option.value}
                />
              ))}
            </Box>
          </RadioButton.Group>
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t('common:dismiss')}</Button>
        <Button onPress={updateLanguage}>{t('common:confirm')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  radioButtonLabel: {textAlign: 'left'},
});

export default UpdateLanguageDialog;
