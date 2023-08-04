import React from 'react';
import {Dialog, DialogProps} from 'react-native-paper';
import {Button, Text} from '@/core';
import {useTranslation} from 'react-i18next';

type Props = {
  title?: string;
  content: string;
  onConfirm?: () => void;
  onReject?: () => void;
} & Omit<DialogProps, 'children'>;

const ConfirmationDialog = ({
  title,
  content,
  onConfirm,
  onReject,
  ...rest
}: Props) => {
  const {t} = useTranslation();
  return (
    <Dialog {...rest} dismissableBackButton dismissable>
      {title ? <Dialog.Title>{title}</Dialog.Title> : null}
      <Dialog.Content>
        <Text>{content}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onReject}>{t('common:no')}</Button>
        <Button onPress={onConfirm}>{t('common:yes')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ConfirmationDialog;
