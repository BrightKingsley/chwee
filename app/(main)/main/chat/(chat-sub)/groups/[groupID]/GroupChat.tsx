"use client";

import { useState } from "react";
import { Messages, SendMessage } from "../../../components";
import { AnimateInOut } from "@/app/components/client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IconButton } from "@/app/components/mui";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function GroupChat({
  params,
  userID,
}: {
  params: { groupID: string };
  userID: string;
}) {
  return (
    <main className="flex flex-col w-full h-[calc(100vh-3.5rem)] bg-primary/10">
      <Messages userID={userID} chatID={params.groupID} roomType="group" />
      <SendMessage chatID={params.groupID} roomType="group" />
    </main>
  );
}
