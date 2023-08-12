import {Button, ScrollView, Surface, Text} from '@/core';
import {useGetErrorMessage} from '@/hooks';
import Styles from '@/utils/styles';
import React, {ReactNode} from 'react';
import {Dialog, Portal} from 'react-native-paper';

type Props = {
  children: ReactNode;
  error?: {
    value: unknown;
    actions: {label: string; action: () => void}[];
  };
  overlay?: boolean;
};

const ErrorHandler = ({children, error, overlay = true}: Props) => {
  const getMessage = useGetErrorMessage();

  const {title, content} = getMessage(error?.value);

  if (!overlay && error) {
    return (
      <ScrollView contentContainerStyle={Styles.scrollviewCentered}>
        <Surface
          rowGap={'s'}
          alignItems={'center'}
          margin="s"
          padding={'m'}
          mode="flat"
          borderRadius={'md'}
          elevation={0}>
          {title ? <Text variant={'titleLarge'}>{title}</Text> : null}
          <Text textAlign={'center'}>{content}</Text>
          {error.actions.map(({label, action}, index) => (
            <Button onPress={action} key={index} mode="contained-tonal">
              {label}
            </Button>
          ))}
        </Surface>
      </ScrollView>
    );
  }

  return (
    <>
      {children}
      <Portal>
        <Dialog visible={!!error}>
          {title ? <Dialog.Title>{title}</Dialog.Title> : null}
          <Dialog.Content>
            <Text>{content}</Text>
          </Dialog.Content>
          {error ? (
            <Dialog.Actions>
              {error.actions.map(({label, action}, index) => (
                <Button onPress={action} key={index}>
                  {label}
                </Button>
              ))}
            </Dialog.Actions>
          ) : null}
        </Dialog>
      </Portal>
    </>
  );
};

export default ErrorHandler;
