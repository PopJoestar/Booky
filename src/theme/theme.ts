import {createTheme} from '@shopify/restyle';
import {LightColors} from './colors';
import {adaptNavigationTheme, MD3LightTheme} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {Typography} from './typography';

const {LightTheme: NavigationLightTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const LightTheme = createTheme({
  ...MD3LightTheme,
  ...NavigationLightTheme,
  colors: {...LightColors, ...NavigationLightTheme.colors},
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
  },
  sizes: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xs: 4,
    xxs: 2,
    bottomSheetHandle: 32,
    listItem_one_line: 56,
    inputHeight: 56,
    radioButtonTarget: 40,
    buttonHeight: 40,
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

export const PaperTheme = {
  ...MD3LightTheme,
  ...NavigationLightTheme,
  colors: {
    ...MD3LightTheme,
    ...LightColors,
  },
};

export default LightTheme;

export type Theme = typeof LightTheme;
