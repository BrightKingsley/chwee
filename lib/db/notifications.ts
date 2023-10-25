import { Notification, NotificationClass } from "@/models";

export async function createNotification({
  body,
  route,
  type,
  userID,
  title,
}: {
  userID: string;
  title: string;
  body: string;
  route: string;
  type: NotificationClass["type"];
}) {
  try {
    const notificationDoc = await Notification.create({
      title,
      body,
      userID,
      timeStamp: new Date(),
      type,
      route,
    });
    if (!notificationDoc) throw new Error("Couldn't create Notification");
    return "success";
  } catch (error) {
    console.error("CRAETE_NOTIFICATION_ERROR", { error });

    return null;
  }
}

export async function getNotifications({ userID }: { userID: string }) {
  try {
    const notificationDocs = await Notification.find({ userID });
    if (!notificationDocs) throw new Error("Couldn't create Notification");
    return notificationDocs;
  } catch (error) {
    console.error("CRAETE_NOTIFICATION_ERROR", { error });
    return null;
  }
}
