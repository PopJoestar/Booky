import {Material3Scheme} from '@pchmn/expo-material3-theme';
import {borderRadii, breakpoints, sizes, spacing} from './layout';
import {BaseTheme} from '@shopify/restyle';

export interface Theme extends BaseTheme {
  colors: Omit<Material3Scheme, 'elevation'>;
  spacing: typeof spacing;
  borderRadii: typeof borderRadii;
  breakpoints: typeof breakpoints;
  sizes: typeof sizes;
}
