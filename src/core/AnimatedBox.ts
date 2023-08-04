import Animated from 'react-native-reanimated';
import {createBox} from '@shopify/restyle';
import {Theme} from '@/theme';
import {ComponentPropsWithRef} from 'react';

const AnimatedBox = createBox<
  Theme,
  ComponentPropsWithRef<typeof Animated.View>
>(Animated.View);

export default AnimatedBox;
