import { Header } from "@/app/components/client";
import Image from "next/image";
export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen md:flex md:flex-col">
      <Header imgShown title="Dashboard" />
      {children}
    </main>
  );
}
