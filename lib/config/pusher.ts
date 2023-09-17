import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1670973",
  // key: process.env.PUSHER_APIKEY as string,
  
  key: 
  "7c895a59e881e3c9a5dc",
  // secret: process.env.PUSHER_SECRET as string,
  secret: "5b248c4f126d00a39d15",
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  // process.env.PUSHER_APIKEY as string,
  "7c895a59e881e3c9a5dc",
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
