import {createTheme} from '@shopify/restyle';
import {LightColors} from './colors';
import {
  adaptNavigationTheme,
  MD3LightTheme,
  MD3Theme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {Typography} from './typography';
import {StatusBar} from 'react-native';

const LightTheme = createTheme({
  ...MD3LightTheme,
  colors: LightColors,
  spacing: {
    none: 0,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xs: 4,
    xxs: 2,
    bottomSheetHandleVertical: 11,
    bottomSheetLargeScreenMargin: 56,
    scaffoldBottom: 48,
    searchbarHeader: (StatusBar.currentHeight ?? 0) + 8,
  },
  sizes: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xs: 4,
    xxs: 2,
    bottomSheetHandle: 32,
    chip: 32,
    listItem_one_line: 56,
    inputHeight: 56,
    radioButtonTarget: 40,
    buttonHeight: 40,
    searchbar: 50,
    tabIndicator: 3,
    book_card_image_height: 105,
    book_card_image_width: 70,
    book_poster_image_height: 165,
    book_poster_image_width: 120,
    book_card_estimated_height: 137,
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
    xxl: 1536,
  },
  textVariants: {
    ...Typography,
    defaults: {...Typography.default, color: 'onSurface'},
  },
  borderRadii: {
    xs: 4,
    sm: 16,
    md: 24,
    lg: 64,
    hg: 128,
  },
  buttonVariants: {
    filledTonal: {
      paddingVertical: 's',
      paddingRight: 'l',
      borderRadius: 'md',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'secondary',
    },
    filled: {
      paddingVertical: 's',
      paddingRight: 'l',
      borderRadius: 'md',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary',
    },
    defaults: {
      paddingVertical: 's',
      paddingRight: 'l',
      borderRadius: 'md',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary',
    },
  },
});

export const {LightTheme: NavigationLightTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const PaperTheme: MD3Theme = {
  ...MD3LightTheme,
  ...NavigationLightTheme,

  colors: {
    ...NavigationLightTheme.colors,
    ...MD3LightTheme.colors,
    ...LightColors,
    elevation: {
      level0: 'transparent',
      // Note: Color values with transparency cause RN to transfer shadows to children nodes
      // instead of View component in Surface. Providing solid background fixes the issue.
      // Opaque color values generated with `palette.primary99` used as background
      level1: 'rgba(99, 97, 0,0.05)', // palette.primary40, alpha 0.05
      level2: 'rgba(99, 97, 0,0.08)',
      level3: 'rgba(99, 97, 0,0.11)', // palette.primary40, alpha 0.11
      level4: 'rgba(99, 97, 0,0.12)', // palette.primary40, alpha 0.12
      level5: 'rgba(99, 97, 0,0.14)', // palette.primary40, alpha 0.14
    },
  },
};

export default LightTheme;

export type Theme = typeof LightTheme;
