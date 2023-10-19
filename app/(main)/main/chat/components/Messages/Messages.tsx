"use client";
import Message from "../Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context";
import { useParams } from "next/navigation";
import { pusherClient } from "@/lib/config";
import { BASE_URL } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import LoadingMessages from "../LoadingMessages";
import ZzzLineIcon from "remixicon-react/ZzzLineIcon";
import { AnimateInOut } from "@/app/components/client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { MessageProps } from "../types";
import { ClientMessage } from "@/types/models";
//TODO typecheck
export default function Messages({
  chatID,
  roomType,
}: {
  chatID: string;
  roomType: ClientMessage["roomType"];
}) {
  const { viewImages, setViewImages } = useContext(ChatContext);

  const [messages, setMessages] = useState<ClientMessage["message"][]>([]);
  const [loading, setLoading] = useState(false);

  // password: b3xF2yRB | q7b5KYV6 | V6XBvBjX

  const { data } = useSession();
  const session: Session | any = data;
  const params = useParams();

  useEffect(() => {
    if (!chatID) return;
    pusherClient.subscribe(chatID);
    pusherClient.bind(
      "incoming-message",
      (message: ClientMessage["message"]) => {
        setMessages((prev) => [...prev, message]);
      }
    );
    return () => pusherClient.unsubscribe(chatID);
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      //TODO remove hard-coded password
      const response = await fetch(
        `${BASE_URL}/api/messaging/${chatID}?roomType=${roomType}&password=V6XBvBjX`,
        {
          cache: "no-cache",
        }
      );

      if (!response.ok) return setLoading(false);

      const data = await response.json();
      console.log({ data });
      if (!data) return setLoading(false);

      const { messages: msgs } = data;
      console.log("CLIENT MSGS", msgs);

      if (!msgs) return;

      setMessages(msgs);
      setLoading(false);
    })();
  }, [chatID]);

  return (
    <>
      <div className="flex flex-col flex-1 pt-1 mx-2 space-y-2 overflow-y-auto">
        {loading ? (
          <LoadingMessages />
        ) : messages.length < 1 || !session || !session.user.id ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="font-bold">
              no messages available{" "}
              <ZzzLineIcon className="w-6 h-6 text-brand-lightblue" />{" "}
            </p>
          </div>
        ) : (
          messages.map((message, i) => (
            <Message
              chatID={chatID}
              key={i}
              message={message}
              roomType={roomType}
              userID={session.user.id}
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
            spaceBetween={1}
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
    </>
  );
  // : (
  //   <div className="flex items-center justify-center w-full h-full">
  //     <h1>No Messages Available</h1>
  //   </div>
  // );
}
