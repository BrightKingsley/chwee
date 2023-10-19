"use client";

import { AnimateInOut } from "@/app/components/client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import TextareaAutosize from "react-textarea-autosize";
import { IconButton } from "@/app/components/mui";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { UploadFileResponse } from "uploadthing/client";
import { ChatContext } from "@/context";
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";

export default function UploadImageData({
  startUpload,
}: {
  startUpload: (
    files: File[],
    input?: undefined
  ) => Promise<UploadFileResponse[] | undefined>;
}) {
  const {
    previewImages,
    selectedImages,
    setPreviewImages,
    sendMessage,
    message,
    setMessage,
  } = useContext(ChatContext);
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
          <div className="relative w-full bg-white rounded-xl">
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
              className="relative w-full p-1 text-gray-700 border-none outline-none resize-none bg-primary/10 rounded-lg focus:outline-primary before:w-full before:h-full before:absolute before:top-0 before:left-0"
            />
          </div>
          <IconButton
            type="submit"
            title="send image"
            aria-label="send image"
            className="flex items-center justify-center w-12 h-12 p-2 border rounded-full shadow-md shadow-primary/10 bg-body stroke-primary"
          >
            {/* <svg
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
            </svg>{" "} */}
            <SendPlane2LineIcon className="w-8 h-8" />
          </IconButton>
        </form>
      </div>
    </AnimateInOut>
  );
}
