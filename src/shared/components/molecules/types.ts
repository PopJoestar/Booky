import {SnackbarProps as PSnackbarProps} from 'react-native-paper';

export type SnackbarProps = Pick<PSnackbarProps, 'action'> & {
  message?: string;
  duration?: number;
};
