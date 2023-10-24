/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose", "@typegoose/typegoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "utfs.io"],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/app/_offline",
  },
  importScripts: ["/service-worker.js"],
});

module.exports = withPWA({
  reactStrictMode: true,
});
module.exports = nextConfig;
