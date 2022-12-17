import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';

const TouchableOpacity = createBox<Theme, RNTouchableOpacityProps>(
  RNTouchableOpacity,
);
export type TouchableOpacityProps = React.ComponentProps<
  typeof TouchableOpacity
>;

export default TouchableOpacity;
