import {Theme} from '@/theme';
import {createBox} from '@shopify/restyle';
import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

const SafeAreaView = createBox<Theme, SafeAreaViewProps>(RNSafeAreaView);

export default SafeAreaView;
