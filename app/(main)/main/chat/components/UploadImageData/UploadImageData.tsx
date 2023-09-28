import { AnimateInOut, Close } from "@/components";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactTextareaAutoSize from "react-textarea-autosize";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useUploadThing } from "@/lib/uploadThing";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadImageData({
  previewImages,
  setPreviewImages,
  setMessage,
  message,
  sendMessage,
}: {
  previewImages: { images: (string | any)[]; show: boolean };
  setPreviewImages: React.Dispatch<
    React.SetStateAction<{ images: (string | any)[]; show: boolean }>
  >;
  sendMessage: Function;
  setMessage: React.Dispatch<React.SetStateAction<MessageBody>>;
  message: MessageBody;
}): React.ReactNode {
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "chatImageUploader",
    {
      onUploadProgress: (e) => {
        console.log("E", e);
      },
      onClientUploadComplete: () => {
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: (e) => {
        alert("upload has begun");
        console.log("E:Upload Begin", e);
      },
    }
  );

  const handleUploadImage = async () => {
    try {
      console.log("IMAGECONTENT: ", message.imageContent);
      if (message.imageContent.length < 1) return;
      const res = await startUpload(message.imageContent);

      console.log("UPLOADED_RES: ", res);
      //   const upload = await res.json();

      //   console.log(upload);
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
        <Close
          close={() => {
            setPreviewImages({ images: [], show: false });
            setMessage((prev) => ({ ...prev, imageContent: [] }));
          }}
          className="absolute z-40 top-4 right-4 text-primary"
        />
        <div className="absolute z-40 flex items-center gap-2 mx-2 bottom-4">
          <ReactTextareaAutoSize
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
          {/* <button
            className="mb-2 text-3xl active:scale-90 active:opacity-40 rounded-full bg-primary p-2 flex items-center justify-center mt-[0.65rem]"
            onClick={handleUploadImage}
          >
            <PaperAirplaneIcon className="w-6 h-6 fill-white" />
          </button> */}
          <UploadButton<OurFileRouter>
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
          />
        </div>
      </div>
    </AnimateInOut>
  );
}
