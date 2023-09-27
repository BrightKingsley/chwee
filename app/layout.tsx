import {
  Header,
  Modal,
  Navbar,
  Notification,
  PortalElements,
} from "@/components";
import { AuthContextProvider } from "@/context";
import "@/public/css/globals.css";
import "swiper/css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  display: "swap",
  fallback: ["poppins"],
  subsets: ["latin-ext", "latin"],
});

const description =
  "Elevate your gaming events with CHWEE - the ultimate platform for organizing online raffle draws and captivating gaming experiences. Say goodbye to logistical nightmares and welcome seamless event management. Engage your community and customers effortlessly with our feature-rich gaming event solution. Enjoy hassle-free raffle logistics and empower your online gaming community with CHWEE's powerful platform.";

const keywords = [
  "online raffle draw",
  "gaming event solution",
  "community gaming",
  "online gaming event",
  "hassle-free raffle",
  "gaming event management",
  "CHWEE platform",
  "raffle logistics",
  "online gaming community",
  "customer engagement",
  "seamless event management",
  "captivating gaming experiences",
  "gaming event organizers",
  "powerful gaming platform",
  "organize raffle draw online",
  "effortless gaming events",
  "interactive raffle experience",
  "enhance customer experience",
  "digital gaming events",
  "online event ticketing",
  "online prize draws",
  "exciting raffle campaigns",
  "raffle software solution",
];

export const metadata: Metadata = {
  metadataBase: new URL("https://chwee.vercel.app"),
  title: "CHWEE: Chat | Wallet | Connect",
  description: description,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/favicon/favicon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "256x256",
      url: "/favicon/favicon-256x256.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "384x384",
      url: "/favicon/favicon-384x384.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/favicon/favicon-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/favicon/favicon-180x180.png",
    },
    {
      rel: "android-chrome",
      type: "image/png",
      sizes: "192x192",
      url: "/favicon/android-chrome-192x192.png",
    },
    {
      rel: "android-chrome",
      type: "image/png",
      sizes: "512x512",
      url: "/favicon/android-chrome-512x512.png",
    },
  ],
  // { apple: "/favicon/apple-touch-icon.png", icon: "/icon.ico", },

  viewport: { width: "device-width, initial-scale=1.0", initialScale: 1 },
  keywords: keywords,
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    title: "CHWEE: Chat | Wallet | Instant",
    description: description,
    siteName: "Chwee",
    locale: "en_UK",
  },
  twitter: {
    site: "/",
    title: "CHWEE: Chat | Wallet | Instant",
    creator: "@chwee",
    card: "summary_large_image",
    description: description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      {/* <link rel="manifest" href="/manifest.webmanifest" /> */}
      <body className="">
        <div id="modal" />
        <div id="notification" />
        <AuthContextProvider>
          <main className="flex w-screen">
            <div className="w-[calc(100vw-3.5rem)]">{children}</div>
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
