import React from 'react';
import {Material3Theme, useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {
  ThemeProvider as RestyleThemeProvider,
  createTheme,
} from '@shopify/restyle';
import {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  ProviderProps,
  adaptNavigationTheme,
} from 'react-native-paper';
import {textVariants} from './typography';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {Theme} from './types';
import {borderRadii, breakpoints, sizes, spacing} from './layout';
import {NavigationTheme} from 'react-native-paper/lib/typescript/types';
import {useSettings} from '@/hooks';

type Material3ThemeProviderProps = {
  theme: Material3Theme;
  updateTheme: (sourceColor: string) => void;
  resetTheme: () => void;
  navigationTheme: NavigationTheme;
  isDark: boolean;
};

const Material3ThemeProviderContext =
  createContext<Material3ThemeProviderProps>({} as Material3ThemeProviderProps);

export const Material3ThemeProvider = ({
  children,
  sourceColor,
  fallbackSourceColor,
  ...otherProps
}: ProviderProps & {sourceColor?: string; fallbackSourceColor?: string}) => {
  const colorScheme = useColorScheme();
  const {appearance} = useSettings();

  const {theme, updateTheme, resetTheme} = useMaterial3Theme({
    sourceColor,
    fallbackSourceColor,
  });

  const isDark = (() => {
    // System
    if (appearance === 2) {
      return colorScheme === 'dark';
    }

    return appearance === 1;
  })();

  const paperTheme = isDark
    ? {...MD3DarkTheme, colors: theme.dark}
    : {...MD3LightTheme, colors: theme.light};

  const restyleTheme: Theme = createTheme({
    colors: {...paperTheme.colors, elevation: 'transparent'},
    spacing,
    sizes,
    breakpoints,
    textVariants,
    borderRadii,
  });

  const {LightTheme: navigationLightTheme, DarkTheme: navigationDarkTheme} =
    adaptNavigationTheme({
      reactNavigationLight: NavigationDefaultTheme,
      reactNavigationDark: NavigationDarkTheme,
      materialLight: {...MD3LightTheme, colors: paperTheme.colors},
      materialDark: {...MD3DarkTheme, colors: paperTheme.colors},
    });

  const navigationTheme = isDark ? navigationDarkTheme : navigationLightTheme;

  return (
    <Material3ThemeProviderContext.Provider
      value={{
        theme,
        updateTheme,
        resetTheme,
        navigationTheme,
        isDark,
      }}>
      <RestyleThemeProvider theme={restyleTheme}>
        <PaperProvider theme={paperTheme} {...otherProps}>
          {children}
        </PaperProvider>
      </RestyleThemeProvider>
    </Material3ThemeProviderContext.Provider>
  );
};

export function useMaterial3ThemeContext() {
  const ctx = useContext(Material3ThemeProviderContext);
  if (!ctx) {
    throw new Error(
      'useMaterial3ThemeContext must be used inside Material3ThemeProvider',
    );
  }
  return ctx;
}
