import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigations from './navigation/Navigations';

import {
  Material3ThemeProvider,
  useMaterial3ThemeContext,
} from './theme/Material3ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import {RealmProvider} from './database';
import {useSettings} from './hooks';

const App = () => {
  return (
    <RealmProvider fallback={<></>}>
      <Main />
    </RealmProvider>
  );
};

const AppContent = () => {
  const {navigationTheme, isDark} = useMaterial3ThemeContext();

  return (
    <GestureHandlerRootView style={styles.ghRoot}>
      <BottomSheetModalProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={isDark ? 'light-content' : 'dark-content'}
            translucent={true}
          />
          <Navigations />
        </NavigationContainer>
        <FlashMessageContainer />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const Main = () => {
  const {appearance, theme} = useSettings();
  const colorScheme = useColorScheme();

  const isDark = (() => {
    // System
    if (appearance === 2) {
      return colorScheme === 'dark';
    }

    return appearance === 1;
  })();

  return (
    <Material3ThemeProvider
      sourceColor={theme === 'dynamic' ? undefined : theme}
      isDark={isDark}>
      <AppContent />
    </Material3ThemeProvider>
  );
};

const FlashMessageContainer = () => {
  const {top} = useSafeAreaInsets();
  return <FlashMessage statusBarHeight={top} />;
};

const styles = StyleSheet.create({
  ghRoot: {
    flex: 1,
  },
});
export default App;
