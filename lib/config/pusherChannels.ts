import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_APIKEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  {
    cluster: "eu",
    authEndpoint: "/api/messaging/pusher-auth",
    authTransport: "ajax",
    auth: {
      headers: {
        "Content-Type": "application/jon",
      },
    },
  }
);
