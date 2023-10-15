// import { skipWaiting, clientsClaim } from "workbox-core";
// import { ExpirationPlugin } from "workbox-expiration";
// import { registerRoute } from "workbox-routing";
// import { StaleWhileRevalidate, NetworkOnly } from "workbox-strategies";
// import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
// import { matchPrecache } from "workbox-precaching";

// skipWaiting();
// clientsClaim();

// declare const self: ServiceWorkerGlobalScope & {
//   __WB_MANIFEST: { url: string; revision: string }[];
// };

// const WB_MANIFEST = self.__WB_MANIFEST || [];

// // Precache fallback route and image
// WB_MANIFEST.push({
//   url: "/fallback",
//   revision: "1234567890",
// });

// precacheAndRoute(WB_MANIFEST);

// cleanupOutdatedCaches();

// registerRoute("/", new NetworkOnly());

// registerRoute(
//   /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
//   new StaleWhileRevalidate()
// );

// registerRoute(
//   /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
//   new StaleWhileRevalidate()
// );

// registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i, new NetworkOnly());

// registerRoute(/\.(?:js)$/i, new StaleWhileRevalidate());

// registerRoute(/\.(?:css|less)$/i, new StaleWhileRevalidate());

// registerRoute(/\.(?:json|xml|csv)$/i, new StaleWhileRevalidate());

// registerRoute(/\/api\/.*$/i, new StaleWhileRevalidate());

// registerRoute(/.*/i, ({ event }) => {
//   return handleDefaultRequest(event as FetchEvent) as Promise<Response>;
// });
// // async function handleDefaultRequest(event: FetchEvent) {
// //   const request = (event as FetchEvent).request;

// //   if (request.destination === "document") {
// //     return matchPrecache("/fallback");
// //   } else if (request.destination === "image") {
// //     return matchPrecache("/static/images/fallback.png");
// //   }
// //   return Response.error();
// // }

// async function handleDefaultRequest(event: any) {
//   const request = new Request(event.request);

//   if (request.destination === "document") {
//     return matchPrecache("/fallback");
//   } else if (request.destination === "image") {
//     return matchPrecache("/static/images/fallback.png");
//   }
//   return Response.error();
// }

import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

registerRoute(
  /^\/(.*)$/i,
  new StaleWhileRevalidate({
    cacheName: "my-pwa-cache",
  })
);
