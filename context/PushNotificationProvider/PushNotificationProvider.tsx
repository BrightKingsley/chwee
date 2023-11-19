"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/constants/routes";

import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { addItemToLocalStorage, shouldRunFunction } from "@/lib/utils";

export default function PushNotificationProvider() {
  const [mounted, setMounted] = useState(false);

  const { data } = useSession();
  const session = data;

  console.log({ session });

  useEffect(() => {
    console.log("REGISTER REACCHEED", { session });

    if (window && "serviceWorker" in navigator) {
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
              if (
                Notification.permission !== "granted" ||
                !session ||
                !session.user ||
                !session.user.id
              ) {
                return;
              }

              const beamsClient = new PusherPushNotifications.Client({
                instanceId: process.env
                  .NEXT_PUBLIC_PUSHER_INSTANCE_ID as string,
                serviceWorkerRegistration: serviceWorkerRegistration,
              });
              if (!session || !session.user || !session.user.id)
                return beamsClient.stop().catch(console.error);

              beamsClient.getUserId().then((userId) => {
                if (userId !== session?.user.id)
                  return beamsClient.stop().catch(console.error);
              });
              // if (shouldRunFunction("requestNotificationPermissionHasRun")) {
              const beamsTokenProvider =
                new PusherPushNotifications.TokenProvider({
                  url: `${BASE_URL}/api/pusher/beams-auth`,
                });

              beamsClient
                .start()
                .then(() =>
                  beamsClient.setUserId(
                    session?.user.id || "",
                    beamsTokenProvider
                  )
                );
              addItemToLocalStorage({
                name: "requestNotificationPermissionHasRun",
                item: true,
              });
              // }
              // beamsClient
              //   .start()
              //   .then((result) => {
              //     const beamsClient =
              //       result as unknown as PusherPushNotifications.Client;
              //     return beamsClient.getDeviceId();
              //   })
              //   .then(async (deviceId) => {
              //     console.log(
              //       "Successfully registered with Beams. Device ID:",
              //       deviceId
              //     );
              //     const response = await fetch(
              //       `${BASE_URL}/api/notifications`,
              //       {
              //         method: "POST",
              //         body: JSON.stringify({ fcmToken: deviceId }),
              //       }
              //     );
              //     const data = await response.json();
              //     console.log("FCM_TOKEN_REPONSE", { data });
              //   })
              //   .then(() => beamsClient.addDeviceInterest("debug-@generalChat"))
              //   .then(() => beamsClient.getDeviceInterests())
              //   .then((interests) =>
              //     console.log("Current interests:", interests)
              //   )
              //   .catch(console.error);
            }
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, [session, session?.user, session?.user.id]);

  return <></>;
}
