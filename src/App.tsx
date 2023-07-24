import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RealmProvider} from './data/database';
import Navigations from './navigation/Navigations';

import {
  Material3ThemeProvider,
  useMaterial3ThemeContext,
} from './theme/Material3ThemeProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <RealmProvider fallback={<></>}>
      <Material3ThemeProvider>
        <AppContent />
      </Material3ThemeProvider>
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
          <FlashMessageContainer />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
