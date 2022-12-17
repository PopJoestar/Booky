import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigations from './navigation/Navigations';
import {SnackbarProvider} from './shared/components';
import {LightTheme} from './theme';

const App = () => {
  return (
    <PaperProvider>
      <ThemeProvider theme={LightTheme}>
        <SnackbarProvider>
          <GestureHandlerRootView style={styles.ghRoot}>
            <BottomSheetModalProvider>
              <NavigationContainer theme={LightTheme}>
                <StatusBar
                  backgroundColor={'transparent'}
                  barStyle="dark-content"
                  translucent={true}
                />
                <Navigations />
              </NavigationContainer>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SnackbarProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  ghRoot: {
    flex: 1,
  },
});
export default App;
