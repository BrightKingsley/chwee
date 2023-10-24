// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

// const firebaseConfig = {
//   apiKey: "AIzaSyBFfImYMw4uHbtiHQwCJVFD6IusEUtzVZI",
//   authDomain: "chat-2a619.firebaseapp.com",
//   // databaseURL: "https://chat-2a619-default-rtdb.firebaseio.com",
//   databaseURL: "http://127.0.0.1:4000/firestore",
//   projectId: "chat-2a619",
//   storageBucket: "chat-2a619.appspot.com",
//   messagingSenderId: "793046143836",
//   appId: "1:793046143836:web:bf50ae8914f224dde3a799",
// };

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging.isSupported ? firebase.messaging() : null;

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "./logo.png",
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
