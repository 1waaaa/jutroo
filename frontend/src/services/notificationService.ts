import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export interface ReminderNotification {
  id: number;
  title: string;
  body: string;
  time: string;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function checkNotificationPermission(): Promise<boolean> {
  const permission = await Notifications.getPermissionsAsync();

  return permission.granted;
}

export async function requestNotificationPermission(): Promise<boolean> {
  const currentPermission = await Notifications.getPermissionsAsync();

  if (currentPermission.granted) {
    return true;
  }

  const requestedPermission = await Notifications.requestPermissionsAsync();

  return requestedPermission.granted;
}

export async function configureNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("reminders", {
      name: "Daily reminders",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  }
}

export async function scheduleReminder(reminder: ReminderNotification) {
  const allowed = await checkNotificationPermission();

  if (!allowed) {
    console.log("Notifications are not allowed.");
    return;
  }

  const [hours, minutes] = reminder.time.split(":").map(Number);

  const now = new Date();

  const notificationDate = new Date();

  notificationDate.setHours(hours, minutes, 0, 0);

  if (notificationDate <= now) {
    console.log(`Skipping expired reminder: ${reminder.title}`);

    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: reminder.title,
      body: reminder.body,
      sound: "default",

      data: {
        reminderId: reminder.id,
      },
    },

    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: notificationDate,
    },
  });

  console.log(`Scheduled: ${reminder.title} at ${reminder.time}`);
}

export async function scheduleReminders(reminders: ReminderNotification[]) {
  const allowed = await checkNotificationPermission();

  if (!allowed) {
    console.log(
      "Reminder scheduling skipped because notifications are disabled.",
    );

    return;
  }

  for (const reminder of reminders) {
    await scheduleReminder(reminder);
  }
}
