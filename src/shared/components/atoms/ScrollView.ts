import {
  ScrollView as NativeScrollView,
  ScrollViewProps as NativeScrollViewProps,
} from 'react-native';
import {createBox} from '@shopify/restyle';
import {Theme} from '../../../theme';

const ScrollView = createBox<Theme, NativeScrollViewProps>(NativeScrollView);
export type ScrollViewProps = React.ComponentProps<typeof ScrollView>;

export default ScrollView;
