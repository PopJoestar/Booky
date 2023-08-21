import {openFileWithThirdPartyApp} from '@/utils/files';
import notifee, {Event, EventType} from '@notifee/react-native';

const openBookFile = async (e: Event) => {
  if (
    e.detail.notification?.data?.filePath === undefined ||
    e.type !== EventType.PRESS
  ) {
    return;
  }

  try {
    openFileWithThirdPartyApp(e.detail.notification.data.filePath as string);
  } catch {}
};

notifee.onBackgroundEvent(openBookFile);
notifee.onForegroundEvent(openBookFile);
