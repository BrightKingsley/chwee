import { SubHeader, Header } from "@/app/components/client";
import {
  DISCOVER_EVENTS,
  REGISTERED_EVENTS,
  MY_EVENTS,
  EVENTS,
} from "@/constants/routes";
import { replaceWith, formatLink } from "@/lib/utils";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col h-screen relative">{children}</div>;
}
