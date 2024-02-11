/** @type {import('next').NextConfig} */
const nextConfig = {};

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
//   fallbacks: {
//     document: "/app/_offline",
//   },
//   importScripts: ["/service-worker.js"],
// });

const NextPwa = require("next-pwa");

const withPWA = NextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/app/_offline",
  },
  importScripts: ["/service-worker.js"],
})({
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose", "@typegoose/typegoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "utfs.io"],
  },
});

module.exports = withPWA;
