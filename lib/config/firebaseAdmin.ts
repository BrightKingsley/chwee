import { initializeApp, applicationDefault } from "firebase-admin/app";
import { Message, getMessaging } from "firebase-admin/messaging";

var admin = require("firebase-admin");

var serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

admin.initializeApp({
  credential: applicationDefault(),
  //   credential: admin.credential.cert(serviceAccount),
  projectId: "chat-2a619",

  //   databaseURL: "https://chat-2a619-default-rtdb.firebaseio.com",
});

export function sendNotification({
  notification,
  registrationToken,
}: {
  notification: Message["notification"];
  registrationToken: string;
}) {
  // This registration token comes from the client FCM SDKs.

  const message: Message = {
    notification,
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  getMessaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}
