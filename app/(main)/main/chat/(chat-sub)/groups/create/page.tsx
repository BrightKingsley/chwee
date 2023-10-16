"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { BASE_URL, GROUPS } from "@/constants/routes";
import { TextareaAutosize } from "@mui/material";
import Image from "next/image";
import { Button, IconButton, Switch } from "@/app/components/mui";
import { useUploadThing } from "@/lib/uploadThing";
import Group from "@mui/icons-material/Group";
import AddPhotoAlternateOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import { useDropzone } from "@uploadthing/react/hooks";
import { FileWithPath } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { NotificationContext } from "@/context";
import Link from "next/link";
import { ClientGroup } from "@/types/models";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useImageUpload } from "@/hooks";

type GroupCreate = {
  description: string;
  name: string;
  tag: string;
  password: boolean;
};

export default function CreateGroup() {
  const { data } = useSession();
  const session: Session | any = data;

  const { triggerNotification } = useContext(NotificationContext);

  const [groupData, setGroupData] = useState<GroupCreate>({
    description: "",
    name: "",
    tag: "",
    password: false,
  });
  const [previewImage, setPreviewImage] = useState<any>("");
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  const { getInputProps, getRootProps, startUpload } = useImageUpload({
    endpoint: "groupPhoto",
    setImg: setSelectedImage,
  });

  const readURI = (img: any) => {
    if (img) {
      let reader = new FileReader();
      reader.onload = function (ev: ProgressEvent<FileReader>) {
        setPreviewImage(ev.target?.result);
      };
      return reader.readAsDataURL(img);
    }
  };

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("SUBMIT REACHED");
    const uploadImage = await startUpload(selectedImage);

    console.log({ uploadImage });

    if (!uploadImage || uploadImage.length < 1)
      return triggerNotification("Couldn't create group, please retry");

    const response = await fetch(`${BASE_URL}/api/groups`, {
      method: "POST",
      body: JSON.stringify({ ...groupData, photo: uploadImage[0].url }),
    });

    const data = await response.json();

    const group: ClientGroup = data;

    console.log("createdGroup", { group });

    if (group)
      triggerNotification(
        <Link href={`${GROUPS}/${group._id}`}>
          Success. Click to go to group chat
        </Link>
      );
    return triggerNotification("Failed to create group, try again.");
  };

  return (
    <div className="">
      <form
        onSubmit={(e: React.SyntheticEvent) => handleCreate(e)}
        className="p-4 pt-20 mx-2 space-y-3 bg-white rounded-lg md:mx-14 md:shadow-lg md:border"
      >
        <div
          className="relative mx-auto cursor-pointer w-fit"
          {...getRootProps()}
        >
          <div className="flex items-center justify-center w-24 h-24 border rounded-full overflow-clip">
            {previewImage ? (
              <Image src={previewImage} alt="new" fill />
            ) : (
              <Group className="w-20 h-20 text-gray-200" />
            )}
          </div>
          <div className="absolute bottom-0 -right-4">
            <IconButton
              className="rounded-full"
              title="attach image"
              aria-label="add photo"
            >
              <label
                htmlFor="image"
                className="flex items-center justify-center text-3xl cursor-pointer active:scale-90 active:opacity-40"
              >
                <AddPhotoAlternateOutlined className="w-6 h-6 fill-primary" />
              </label>
              <input
                required
                // value={}
                {...getInputProps()}
                type="file"
                id="image"
                accept="image/*"
                hidden
                onInput={(e: any) => {
                  const target = e.target as HTMLInputElement;

                  // @ts-ignore TODO
                  const img = Object.values<any>(target.files)[0];

                  console.log({ e });
                  readURI(img);
                  //TODO COMEBACK ADD_TYPES
                  //@ts-ignore
                  return setSelectedImage(img);
                }}
              />
            </IconButton>
          </div>
        </div>

        <div>
          <small>name</small>
          <input
            required
            value={groupData.name}
            type="text"
            onChange={(e) => {
              setGroupData((prev) => ({ ...prev, name: e.target.value }));
            }}
            className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/10"
          />
        </div>
        <div>
          <small>tag</small>
          <input
            required
            value={groupData.tag}
            type="text"
            onChange={(e) => {
              setGroupData((prev) => ({ ...prev, tag: e.target.value }));
            }}
            className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/10"
          />
        </div>
        <div>
          <small>description</small>
          <TextareaAutosize
            value={groupData.description}
            // cols={5}
            maxRows={6}
            minRows={5}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setGroupData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full p-1 text-gray-700 border-none rounded-md outline-none resize-none focus:outline-primary bg-primary/10"
          />
        </div>
        <div className="flex items-center justify-between">
          <p>Locked</p>
          <Switch
            checked={groupData.password}
            onChange={(e) => {
              setGroupData((prev) => ({
                ...prev,
                password: e.target.checked,
              }));
            }}
          />
        </div>

        <div className="rounded-md overflow-clip">
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
