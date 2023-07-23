import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RealmProvider} from './db/database';
import Navigations from './navigation/Navigations';
import {SnackbarProvider} from './shared/components';

import {
  Material3ThemeProvider,
  useMaterial3ThemeContext,
} from './theme/Material3ThemeProvider';

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
    <SnackbarProvider>
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
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SnackbarProvider>
  );
};

const styles = StyleSheet.create({
  ghRoot: {
    flex: 1,
  },
});
export default App;
