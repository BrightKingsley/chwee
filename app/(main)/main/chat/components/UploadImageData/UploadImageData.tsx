"use client";

import { AnimateInOut, Close } from "@/components/shared";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { TextareaAutosize } from "@mui/material";
import { IconButton } from "@/components/mui";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useUploadThing } from "@/lib/uploadThing";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useImageUpload } from "@/hooks";
import { useState } from "react";
import { UploadFileResponse } from "uploadthing/client";

export default function UploadImageData({
  previewImages,
  setPreviewImages,
  setMessage,
  message,
  sendMessage,
  startUpload,
  selectedImages,
}: {
  previewImages: { images: (string | any)[]; show: boolean };
  setPreviewImages: React.Dispatch<
    React.SetStateAction<{ images: (string | any)[]; show: boolean }>
  >;
  selectedImages: File[];
  sendMessage: Function;
  setMessage: React.Dispatch<React.SetStateAction<MessageBody>>;
  message: MessageBody;
  startUpload: (
    files: File[],
    input?: undefined
  ) => Promise<UploadFileResponse[] | undefined>;
}): React.ReactNode {
  const handleUploadImage = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      console.log({ selectedImages });
      const res = await startUpload(selectedImages);
      console.log("FRON_UPLOAD_IMG", { res });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimateInOut
      init={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      out={{ opacity: 0 }}
      show={previewImages.show}
      className="fixed h-[calc(100vh-3.5rem)] w-[calc(100vw-3.5rem)]_ w-full bg-white top-14 right-0 z-30"
    >
      <div className="relative flex flex-col items-center w-full h-full">
        <Swiper
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
          {previewImages.images.map((image, index) => (
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
              setPreviewImages({ images: [], show: false });
              setMessage((prev) => ({ ...prev, imageContent: [] }));
            }}
            className="text-gray-700 rounded-full"
          >
            <XMarkIcon className="w-8 h-8" />
          </IconButton>
        </div>

        <form
          onSubmit={handleUploadImage}
          className="absolute z-40 flex items-center gap-2 mx-2 bottom-4"
        >
          <TextareaAutosize
            value={message.textContent}
            // cols={5}
            maxRows={5}
            onChange={(e) =>
              setMessage((prev) => ({
                ...prev,
                textContent: e.target.value,
              }))
            }
            className="relative w-full p-1 text-gray-700 border-none outline-none resize-none bg-primary/10 rounded-xl focus:outline-primary before:w-full before:h-full before:absolute before:top-0 before:left-0"
          />
          <IconButton
            type="submit"
            title="send image"
            aria-label="send image"
            className="flex items-center justify-center w-12 h-12 p-2 border rounded-full shadow-md shadow-primary/10 bg-body stroke-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              // stroke="currentColor"
              strokeWidth={2}
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>{" "}
          </IconButton>
          {/* <UploadButton<OurFileRouter>
            endpoint="chatImageUploader"
            onUploadBegin={(req) => {
              console.log("BEGIN_REQ: ", req);
            }}
            onUploadError={(req) => {
              console.log("ERROR", req);
            }}
            onUploadProgress={(req) => {
              console.log("PROGRESS", req);
            }}
            onClientUploadComplete={(files) => {
              console.log("FILES: ", files);

              const imageContent = files?.map((file) => file.url);

              console.log("IMAGE_CONTENT", imageContent);
              setMessage((prev) => ({
                ...prev,
                imageContent: imageContent as string[],
              }));

              sendMessage(imageContent);
            }}
          /> */}
        </form>
      </div>
    </AnimateInOut>
  );
}
