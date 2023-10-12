"use client";

import { useState } from "react";
import { Messages, SendMessage } from "../../../components";
import { AnimateInOut } from "@/components/shared";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IconButton } from "@/components/mui";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function P2pChat({ params }: { params: { chatID: string } }) {
  const [replyMessage, setReplyMessage] = useState<{
    sender: string;
    textContent?: string;
    imageContent?: string[];
  }>({ sender: "", textContent: "", imageContent: [] });

  const [inputRef, setInputRef] = useState<React.MutableRefObject<undefined>>();
  const [viewImages, setViewImages] = useState<{
    images: string[];
    clickedImage: number;
  }>({
    images: [],
    clickedImage: 0,
  });

  return (
    <main className="flex flex-col w-full h-[calc(100vh-3.5rem)] bg-primary/10">
      <Messages
        chatID={params.chatID}
        setReplyMessage={setReplyMessage}
        roomType="p2p"
        inputRef={inputRef}
        getViewImages={setViewImages}
      />
      <SendMessage
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        chatID={params.chatID}
        roomType="p2p"
        getInputRef={setInputRef}
      />
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
    </main>
  );
}
