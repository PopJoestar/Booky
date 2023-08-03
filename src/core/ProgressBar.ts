import {Theme} from '@/theme';
import {createBox} from '@shopify/restyle';
import {
  ProgressBarProps,
  ProgressBar as RNProgressBar,
} from 'react-native-paper';

const ProgressBar = createBox<Theme, ProgressBarProps>(RNProgressBar);

export default ProgressBar;
