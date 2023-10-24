"use client";
import React, { useEffect, useState } from "react";
// import { getMessaging, onMessage } from "firebase/messaging";
// import { useFcmToken } from "@/hooks";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/constants/routes";
// import { firebaseCloudMessaging } from "@/lib/config/firebaseClient";

import * as PusherPushNotifications from "@pusher/push-notifications-web";

export default function PushNotificationProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("REGISTER REACCHEED");

    if (window && "serviceWorker" in navigator) {
      // const beamsClient = new PusherPushNotifications.Client({
      //   instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID as string,
      // });

      navigator.serviceWorker
        .register("/service-worker.js") // Specify the correct path to your service worker file.
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .then(() => {
          window.navigator.serviceWorker.ready.then(
            (serviceWorkerRegistration) => {
              const beamsClient = new PusherPushNotifications.Client({
                instanceId: process.env
                  .NEXT_PUBLIC_PUSHER_INSTANCE_ID as string,
                serviceWorkerRegistration: serviceWorkerRegistration,
              });
              beamsClient
                .start()
                .then((result) => {
                  const beamsClient =
                    result as unknown as PusherPushNotifications.Client;
                  return beamsClient.getDeviceId();
                })
                .then(async (deviceId) => {
                  console.log(
                    "Successfully registered with Beams. Device ID:",
                    deviceId
                  );
                  const response = await fetch(
                    `${BASE_URL}/api/notifications`,
                    {
                      method: "POST",
                      body: JSON.stringify({ fcmToken: deviceId }),
                    }
                  );
                  const data = await response.json();
                  console.log("FCM_TOKEN_REPONSE", { data });
                })
                .then(() => beamsClient.addDeviceInterest("@generalChat"))
                .then(() => beamsClient.getDeviceInterests())
                .then((interests) =>
                  console.log("Current interests:", interests)
                )
                .catch(console.error);
            }
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return <></>;
}
