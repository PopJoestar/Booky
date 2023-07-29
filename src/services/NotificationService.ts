import notifee, {AndroidChannel, Notification} from '@notifee/react-native';

export const createChannel = async (channel: AndroidChannel) => {
  const channelId = await notifee.createChannel({
    vibration: true,
    lights: true,
    ...channel,
  });
  return channelId;
};

export const requestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  return settings.authorizationStatus;
};

export const displayNotification = async (notification: Notification) => {
  await notifee.displayNotification(notification);
};

export const cancelNotification = async (notificationId: string) => {
  await notifee.cancelDisplayedNotification(notificationId);
};

const NotificationService = {
  createChannel,
  requestNotificationPermission,
  cancelNotification,
  displayNotification,
};

export default NotificationService;
