"use client";
import React, { useEffect, useState } from "react";
// import { getMessaging, onMessage } from "firebase/messaging";
// import { useFcmToken } from "@/hooks";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/constants/routes";
import { initializeBeamsClient } from "@/lib/config/pusherBeams";
// import { firebaseCloudMessaging } from "@/lib/config/firebaseClient";

export default function PushNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data } = useSession();
  // const session = data;

  // const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // // Use the token as needed
  // fcmToken && console.log("FCM token:", fcmToken);

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (!session || !session.user || !session.user.id) return;
  //   (async () => {
  //     const response = await fetch(`${BASE_URL}/api/notifications`, {
  //       method: "POST",
  //       body: JSON.stringify({ fcmToken }),
  //     });
  //     const data = await response.json();
  //     console.log("FCM_TOKEN_REPONSE", { data });
  //   })();

  //   if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  //     const messaging = getMessaging(firebaseApp);
  //     const unsubscribe = onMessage(messaging, (payload) => {
  //       console.log("Foreground push notification received:", {
  //         payload,
  //         fcmToken,
  //       });
  //       // Handle the received push notification while the app is in the foreground
  //       // You can display a notification or update the UI based on the payload
  //     });
  //     return () => {
  //       unsubscribe(); // Unsubscribe from the onMessage event
  //     };
  //   }
  // }, []);

  const [mounted, setMounted] = useState(false);
  // if (mounted) {
  //   firebaseCloudMessaging.onMessage();
  // }
  // useEffect(() => {
  //   firebaseCloudMessaging.init();
  //   const setToken = async () => {
  //     const token = await firebaseCloudMessaging.tokenInlocalforage();
  //     const response = await fetch(`${BASE_URL}/api/notifications`, {
  //       method: "POST",
  //       body: JSON.stringify({ fcmToken: token }),
  //     });
  //     const data = await response.json();
  //     console.log("FCM_TOKEN_REPONSE", { data });
  //     if (token) {
  //       setMounted(true);
  //       // not working
  //     }
  //   };
  //   const result = setToken();
  //   console.log("result", result);
  // }, []);

  useEffect(() => {
    console.log("REGISTER REACCHEED");

    if ("serviceWorker" in navigator) {
      console.log("WORKER TRUE");

      navigator.serviceWorker
        .register("/service-worker.js") // Specify the correct path to your service worker file.
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .then(() => {
          initializeBeamsClient();
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return <>{children}</>;
}
