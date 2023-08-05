import React, {useEffect} from 'react';
import {Snackbar, SnackbarProps} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {redirectToManageExternalStoragePermission} from '@/utils/permissions';

const StorageAccessSnackBar = ({
  visible,
  onDismiss,
  ...rest
}: Omit<SnackbarProps, 'children'>) => {
  const {t} = useTranslation();

  // Fix snackbar not dismissed
  useEffect(() => {
    if (!visible) {
      return;
    }
    setTimeout(() => {
      onDismiss();
    }, 4000);
  }, [onDismiss, visible]);

  return (
    <Snackbar
      {...rest}
      visible={visible}
      onDismiss={onDismiss}
      wrapperStyle={styles.wrapper}
      action={{
        label: t('common:settings'),
        onPress: async () => {
          await redirectToManageExternalStoragePermission();
        },
      }}>
      {t('common:storage_access_required_delete_file')}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  wrapper: {bottom: 80},
});

export default StorageAccessSnackBar;
