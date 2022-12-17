import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {SnackbarProvider} from './shared/components';
import {LightTheme, PaperTheme} from './theme';

const App = () => {
  return (
    <PaperProvider theme={PaperTheme}>
      <ThemeProvider theme={LightTheme}>
        <SnackbarProvider>
          <GestureHandlerRootView style={styles.ghRoot}>
            <BottomSheetModalProvider>
              <NavigationContainer theme={LightTheme}></NavigationContainer>
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
