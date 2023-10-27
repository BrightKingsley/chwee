"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NotificationContext } from "@/context";
import { useUploadThing } from "@/lib/uploadThing";
import { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  UploadFileResponse,
  generateClientDropzoneAccept,
} from "uploadthing/client";

function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

const Endpoint = strEnum(Object.keys(ourFileRouter));

type Endpoint = keyof typeof Endpoint;

export default function useImageUpload({
  endpoint,
  setImg,
  onClientUploadComplete,
}: {
  endpoint:
    | "chatImageUploader"
    | "userPhoto"
    | "groupPhoto"
    | "eventPhoto"
    | "mediaPost";
  setImg: React.Dispatch<React.SetStateAction<File[]>>;
  onClientUploadComplete?:
    | ((files?: UploadFileResponse[] | undefined) => void)
    | undefined;
}) {
  const { triggerNotification } = useContext(NotificationContext);

  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log({ acceptedFiles });
    setImg(acceptedFiles);
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    endpoint,
    {
      onUploadProgress: (e) => {
        setUploadProgress(e);
      },
      onClientUploadComplete,
      onUploadError: (e) => {
        console.log("ERROR", e);
        triggerNotification("error occurred while uploading group photo");
      },
      onUploadBegin: (e) => {
        // TODO remove this notification
        // triggerNotification("upload has begun");
        console.log("E:Upload Begin", e);
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    onDropAccepted(files, event) {
      console.log({ files, event });
      setImg(files);
    },
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    console.log({ isUploading });
  }, [isUploading]);

  return { startUpload, getInputProps, getRootProps, uploadProgress };
}
