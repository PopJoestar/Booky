import React, {useCallback, useState} from 'react';
import {Snackbar} from 'react-native-paper';
import {useContext} from 'react';
import {Text} from '..';
import {SnackbarProps, SnackbarProviderProps} from './types';
import {GestureResponderEvent} from 'react-native';

// eslint-disable-next-line no-spaced-func
const SnackbarContext = React.createContext<
  ((options: SnackbarProps) => void) | undefined
>(undefined);

const SnackbarProvider = ({children}: SnackbarProviderProps) => {
  const [snackbarProps, setSnackbarProps] = useState<
    SnackbarProps & {visible: boolean}
  >({
    visible: false,
  });

  const dismissSnackbar = () => {
    setSnackbarProps(prevState => ({...prevState, visible: false}));
  };

  const show = useCallback((options: SnackbarProps) => {
    setSnackbarProps(prevState => ({
      ...prevState,
      ...options,
      visible: true,
    }));
  }, []);

  const actionOnPress = (e: GestureResponderEvent) => {
    if (
      snackbarProps.action !== undefined &&
      snackbarProps.action.onPress !== undefined
    ) {
      snackbarProps.action.onPress(e);
    }

    dismissSnackbar();
  };

  return (
    <SnackbarContext.Provider value={show}>
      {children}
      <Snackbar
        visible={snackbarProps.visible}
        action={
          snackbarProps.action
            ? {...snackbarProps.action, onPress: actionOnPress}
            : undefined
        }
        onDismiss={dismissSnackbar}>
        <Text color="onInverseSurface" variant="bodyMedium">
          {snackbarProps.message}
        </Text>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
};

export default SnackbarProvider;
