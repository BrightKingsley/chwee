"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import Link from "next/link";
import { OurFileRouter } from "../api/uploadthing/core";

export default function UploadButtonPage() {
  const [images, setImages] = useState<
    { fileUrl: string; fileKey: string }[] | undefined
  >([]);

  const [progress, setProgress] = useState(0);

  const title = images?.length ? (
    <>
      <p>Upload Complete</p>
      <p className="mt-2">{images.length} files</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
      <ul>
        {images?.map((image) => (
          <li key={image.fileUrl} className="mt-2">
            <Link href={image.fileUrl} target="_blank">
              {image.fileUrl}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(
          res: { fileUrl: string; fileKey: string }[] | undefined
        ) => {
          // Do something with the response
          if (res) {
            setImages(res);
            const json = JSON.stringify(res);
            console.log(json);
          }

          // alert("Upload Completed");
        }}
        onUploadProgress={(progress) => {
          setProgress(progress);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
      <h1>{progress} done</h1>
    </main>
  );
}
