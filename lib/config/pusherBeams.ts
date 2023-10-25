import PushNotifications from "@pusher/push-notifications-server";
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

export const beamsClient = new PushNotifications({
  instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID as string,
  secretKey: process.env.PUSHER_BEAMS_SECRET_KEY as string,
});
