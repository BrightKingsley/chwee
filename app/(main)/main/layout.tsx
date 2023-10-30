import {
  Header,
  Modal,
  Navbar,
  Notification,
  PortalElements,
} from "@/app/components/client";
import {
  AuthContextProvider,
  ChatContextProvider,
  ModalContextProvider,
  NotificationContextProvider,
  PushNotificationProvider,
  ScreenContext,
  ThemeContextProvider,
  TransactionContextProvider,
} from "@/context";
import "@/public/css/globals.css";
import "swiper/css";
import type { Metadata } from "next";
import { Rat } from "@/app/components/server";
const keywords = [
  "in-chat billing",
  "send, receive money",
  "real-time communication",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="modal" />
      <div id="notification" />
      <div id="transaction-form" />
      <AuthContextProvider>
        <ThemeContextProvider>
          <NotificationContextProvider>
            <TransactionContextProvider>
              <ChatContextProvider>
                <ModalContextProvider>
                  <ScreenContext>
                    <PushNotificationProvider />
                    <main className="w-screen h-screen md:flex bg-pattern">
                      <Navbar />
                      <div className="w-screen md:w-[calc(100vw-3.5rem)]">
                        {children}
                      </div>
                      <div className="fixed bottom-0 left-0">
                        <PortalElements />
                      </div>
                    </main>
                    <Rat />
                  </ScreenContext>
                </ModalContextProvider>
              </ChatContextProvider>
            </TransactionContextProvider>
          </NotificationContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
}
