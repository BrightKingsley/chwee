import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import localforage from "localforage";

const firebaseConfig = {
  apiKey: "AIzaSyBFfImYMw4uHbtiHQwCJVFD6IusEUtzVZI",
  authDomain: "chat-2a619.firebaseapp.com",
  // databaseURL: "https://chat-2a619-default-rtdb.firebaseio.com",
  databaseURL: "http://127.0.0.1:4000/firestore",
  projectId: "chat-2a619",
  storageBucket: "chat-2a619.appspot.com",
  messagingSenderId: "793046143836",
  appId: "1:793046143836:web:bf50ae8914f224dde3a799",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const token = await localforage.getItem("fcm_token");
    console.log("fcm_token tokenInlocalforage", token);
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert("Notificacion");
    });
  },

  init: async function () {
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        console.log("it already exists");
        return false;
      }
      console.log("it is creating it.");
      const messaging = getMessaging(app);
      await Notification.requestPermission();
      getToken(messaging, {
        vapidKey:
          "MyvapidKeyFromFirebase Look for the documentation how to generate this token in Firebase. it is quite simple",
      })
        .then((currentToken) => {
          console.log("current Token", currentToken);
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // save the token in your database
            localforage.setItem("fcm_token", currentToken);
            console.log("fcm_token", currentToken);
          } else {
            // Show permission request UI
            console.log(
              "NOTIFICACION, No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log(
            "NOTIFICACIONAn error occurred while retrieving token . "
          );
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
