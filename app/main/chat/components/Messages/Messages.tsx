"use client";
import Message from "../Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/config";
import { BASE_URL } from "@/constants/routes";
import { useSession } from "next-auth/react";
import LoadingMessages from "../LoadingMessages";
import { AnimateInOut, CircularProgress } from "@/app/components/client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IconButton, Button } from "@/app/components/mui";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ClientMessage } from "@/types/models";

import { EffectCreative, Navigation, Pagination } from "swiper/modules";

import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import ZzzLineIcon from "remixicon-react/ZzzLineIcon";
//TODO typecheck
export default function Messages({
  chatID,
  roomType,
  userID,
}: {
  chatID: string;
  roomType: ClientMessage["roomType"];
  userID: string;
}) {
  const {
    hardReset,
    viewImages,
    setViewImages,
    messages,
    setMessages,
    setMessagesLoading,
    messagesLoading,
    setChatID,
  } = useContext(ChatContext);

  // password: b3xF2yRB | q7b5KYV6 | V6XBvBjX

  const { data } = useSession();
  const session = data;

  const { refresh } = useRouter();

  useEffect(() => {
    if (!chatID) return;
    pusherClient.subscribe(chatID);
    pusherClient.bind(
      "incoming-message",
      (message: ClientMessage["message"]) => {
        if (
          message.message.sender === userID &&
          message.message.type === "conversation"
        ) {
          return;
        } else {
          setMessages((prev) => [...prev, message]);
        }
      }
    );
    return () => pusherClient.unsubscribe(chatID);
  }, []);

  useEffect(() => {
    if (messages.length > 0) return;
    setMessagesLoading(true);
    (async () => {
      //TODO: Remove hard-coded password
      const response = await fetch(
        `${BASE_URL}/api/messaging/${chatID}?roomType=${roomType}&password=V6XBvBjX`,
        {
          cache: "no-cache",
        }
      );

      // if (!response.ok) return setMessagesLoading(false);

      const data = await response.json();
      if (!data) return setMessagesLoading(false);

      const { messages: msgs } = data;

      if (!msgs) return;

      setMessages(msgs);
      setMessagesLoading(false);
    })();
  }, [chatID, messages.length]);

  useEffect(() => {
    return () => {
      console.log("RETURN EXIT CLEANUP");
      hardReset();
    };
  }, []);

  useEffect(() => {
    setChatID(chatID);
  }, [chatID]);

  return (
    <>
      <div className="flex flex-col flex-1 pt-1 mx-2 space-y-2 overflow-y-auto">
        {messagesLoading ? (
          <LoadingMessages />
        ) : messages.length < 1 || !session || !session.user.id ? (
          <div className="flex flex-col justify-center w-full h-full mx-auto space-y-3 text-center">
            <div className="flex items-center justify-center">
              <p className="font-bold">no messages available</p>
              <ZzzLineIcon className="w-4 h-4 text-brand-lightblue" />
            </div>
            <div className="mx-auto space-y-2 w-fit">
              <small>Try Refreshing the page</small>
              <Button
                onClick={() => refresh()}
                variant="outlined"
                className="flex items-center gap-3 px-2 py-2 mx-auto"
              >
                <p>refresh</p>
                <RefreshLineIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        ) : (
          messages.map((message, i) => (
            <Message
              // chatID={chatID}
              key={i}
              message={message}
              roomType={roomType}
              userID={session.user.id as string}
            />
          ))
        )}
      </div>
      <AnimateInOut
        init={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        out={{ opacity: 0 }}
        show={viewImages.images.length > 0}
        className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-3.5rem)]_ w-full bg-white top-14 right-0 z-30"
      >
        <div className="relative flex flex-col items-center w-full h-full">
          <Swiper
            initialSlide={viewImages.clickedImage}
            className="w-full h-full"
            navigation
            spaceBetween={1}
            pagination={{
              bulletActiveClass: "active-bullet",
              clickable: true,
            }}
            effect={"creative"}
            creativeEffect={{
              prev: {
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            modules={[EffectCreative, Pagination, Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {viewImages.images.map((image, index) => (
              <SwiperSlide
                className="flex items-center justify-center w-full h-full"
                key={index}
              >
                <Image
                  fill
                  src={image}
                  alt="selected"
                  className="object-contain w-full h-full"
                  loading="lazy"
                />
                {/* works? */}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute z-40 top-4 right-4">
            <IconButton
              onClick={() => {
                setViewImages({ images: [], clickedImage: 0 });
              }}
              className="text-gray-700 rounded-full"
            >
              <XMarkIcon className="w-8 h-8" />
            </IconButton>
          </div>
        </div>
      </AnimateInOut>
      <CircularProgress />
    </>
  );
}
