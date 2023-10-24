import { BASE_URL } from "@/constants/routes";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const beamsClient = new PusherPushNotifications.Client({
  instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID as string,
});

export function initializeBeamsClient() {
  beamsClient
    .start()
    .then((result) => {
      const beamsClient = result as unknown as PusherPushNotifications.Client;
      return beamsClient.getDeviceId();
    })
    .then(async (deviceId) => {
      console.log("Successfully registered with Beams. Device ID:", deviceId);
      const response = await fetch(`${BASE_URL}/api/notifications`, {
        method: "POST",
        body: JSON.stringify({ fcmToken: deviceId }),
      });
      const data = await response.json();
      console.log("FCM_TOKEN_REPONSE", { data });
    })
    .then(() => beamsClient.addDeviceInterest("@generalChat"))
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => console.log("Current interests:", interests))
    .catch(console.error);
}

/*
curl -H "Content-Type: application/json" /
   -H "Authorization: Bearer D62B6565DC0FD6541D30C812D44E0B1DC186C3A04875FA117F0FBDEB31D3A4A1
" /
   -X POST "https://5950d3f4-0b99-43d3-b6ad-6d16a4706205.pushnotifications.pusher.com/publish_api/v1/instances/5950d3f4-0b99-43d3-b6ad-6d16a4706205/publishes/interests" /
   -d @publish-body.json
   
   */
/*
curl -H "Content-Type: application/json" / -H "Authorization: Bearer D62B6565DC0FD6541D30C812D44E0B1DC186C3A04875FA117F0FBDEB31D3A4A1" / -X POST "https://5950d3f4-0b99-43d3-b6ad-6d16a4706205.pushnotifications.pusher.com/publish_api/v1/instances/5950d3f4-0b99-43d3-b6ad-6d16a4706205/publishes/interests" / -d @publish-body.json

*/
