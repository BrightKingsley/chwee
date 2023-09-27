import {
  Header,
  Modal,
  Navbar,
  Notification,
  PortalElements,
} from "@/components";
import {
  AuthContextProvider,
  ChatContextProvider,
  ModalContextProvider,
  NotificationContextProvider,
  ThemeContextProvider,
} from "@/context";
import "@/public/css/globals.css";
import "swiper/css";
import type { Metadata } from "next";
const keywords = [
  "online raffle draw",
  "gaming event solution",
  "community gaming",
  "online gaming event",
  "hassle-free raffle",
  "gaming event management",
  "DRAWR platform",
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

// export const metadata: Metadata = {
//   metadataBase: new URL("https://drawr.vercel.app"),
//   title:
//     "DRAWR: Simplifying Your Online Raffle Draw - The Ultimate Gaming Event Solution",
//   description: description,
//   icons: { apple: "/apple-touch-icon.png", icon: "" },
//   viewport: { width: "device-width", initialScale: 1 },
//   keywords: keywords,
//   openGraph: {
//     type: "website",
//     url: "/",
//     title:
//       "DRAWR: Simplifying Your Online Raffle Draw - The Ultimate Gaming Event Solution",
//     description: description,
//     siteName: "Drawr",
//     locale: "en_UK",
//   },
//   twitter: {
//     site: "/",
//     title:
//       "DRAWR: Simplifying Your Online Raffle Draw - The Ultimate Gaming Event Solution",
//     creator: "@drawr",
//     card: "summary_large_image",
//     description: description,
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="modal" />
      <div id="notification" />
      <AuthContextProvider>
        <ThemeContextProvider>
          <NotificationContextProvider>
            <ModalContextProvider>
              <ChatContextProvider>
                <main className="flex w-screen">
                  <PortalElements />
                  <Navbar />
                  <div className="w-screen md:w-[calc(100vw-3.5rem)]">
                    {children}
                  </div>
                </main>
              </ChatContextProvider>
            </ModalContextProvider>
          </NotificationContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
}