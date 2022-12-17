import {createBox} from '@shopify/restyle';
import {
  TouchableRippleProps,
  TouchableRipple as PTouchableRipple,
} from 'react-native-paper';
import {Theme} from '../../../theme';

const TouchableRipple = createBox<Theme, Omit<TouchableRippleProps, 'theme'>>(
  PTouchableRipple,
);

export default TouchableRipple;
