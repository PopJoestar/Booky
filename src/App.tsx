import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import {useTranslation} from 'react-i18next';
import {Constants} from './constants';

import * as SplashScreen from 'expo-splash-screen';
import {
  AddBookToCollectionModal,
  ConfirmationDialogRemoveBookEverywhere,
  ConfirmationDialogRemoveBookFromLibrary,
  ConfirmationDialogRemoveCollection,
  CreateCollectionDialog,
  RenameCollectionDialog,
} from './components';
import {useModal} from './stores';
import {Modals} from './types/modal';
import DownloadBookDialog from './components/DownloadBookDialog';

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <RealmProvider fallback={<></>}>
      <Main />
    </RealmProvider>
  );
};

const AppContent = () => {
  const {navigationTheme, isDark} = useMaterial3ThemeContext();
  const {modals} = useModal<Modals>();
  return (
    <GestureHandlerRootView style={styles.ghRoot}>
      <BottomSheetModalProvider>
        <NavigationContainer
          theme={navigationTheme}
          onReady={async () => {
            await SplashScreen.hideAsync();
          }}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={isDark ? 'light-content' : 'dark-content'}
            translucent={true}
          />
          <Navigations />
          {modals.includes('rename_collection') ? (
            <RenameCollectionDialog />
          ) : null}
          {modals.includes('remove_collection') ? (
            <ConfirmationDialogRemoveCollection />
          ) : null}
          {modals.includes('create_collection') ? (
            <CreateCollectionDialog />
          ) : null}
          {modals.includes('remove_book_from_library') ? (
            <ConfirmationDialogRemoveBookFromLibrary />
          ) : null}
          {modals.includes('remove_book_everywhere') ? (
            <ConfirmationDialogRemoveBookEverywhere />
          ) : null}
          {modals.includes('download_book') ? <DownloadBookDialog /> : null}
          {modals.includes('add_book_to_collection') ? (
            <AddBookToCollectionModal />
          ) : null}
        </NavigationContainer>
        <FlashMessageContainer />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const Main = () => {
  const {i18n} = useTranslation();
  const {appearance, theme, language} = useSettings();
  const colorScheme = useColorScheme();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

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
      fallbackSourceColor={Constants.DEFAULT_COLOR}
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
