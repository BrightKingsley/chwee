"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { BASE_URL, GROUPS } from "@/constants/routes";
import { TextareaAutosize } from "@mui/material";
import { Input } from "@material-tailwind/react";
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
import { lettersAndNumbersOnly } from "@/lib/utils";
import Warning from "@mui/icons-material/Warning";
import AbcOutlined from "@mui/icons-material/AbcOutlined";

type GroupCreate = {
  description: string;
  name: string;
  tag: string;
  locked: boolean;
  password: string;
};

export default function GroupEditForm({
  params,
}: {
  params: { groupID: string };
}) {
  const { data } = useSession();
  const session: Session | any = data;

  const { triggerNotification } = useContext(NotificationContext);

  const [groupData, setGroupData] = useState<GroupCreate>({
    description: "",
    name: "",
    tag: "",
    locked: false,
    password: "",
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

  const updateGroupInfo = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let photo = "";
    if (selectedImage.length > 0) {
      const uploadImage = await startUpload(selectedImage);
      console.log({ uploadImage });
      if (!uploadImage || uploadImage.length < 1)
        return triggerNotification("Couldn't update group, please retry");
      photo = uploadImage[0].url;
    }

    let groupPassword: string | boolean;

    if (groupData.password.length > 0) {
      groupPassword = groupData.password;
    } else if (!groupData.locked) {
      groupPassword = false;
    } else {
      groupPassword = true;
    }

    const submitData = {
      password: groupPassword,
      description: groupData.description,
      name: groupData.tag,
      tag: groupData.tag,
    };

    const response = await fetch(`${BASE_URL}/api/groups/${params.groupID}`, {
      method: "PATCH",
      body: JSON.stringify({ ...submitData, photo }),
    });

    const data = await response.json();

    const group: ClientGroup = data;

    console.log("updatedGroup", { group });

    if (group)
      return triggerNotification(
        <Link href={`${GROUPS}/${group._id}`}>
          Success! Click to go to group chat
        </Link>
      );
    return triggerNotification("Failed to update group, try again.");
  };

  return (
    <>
      <div className="">
        <form
          onSubmit={(e: React.SyntheticEvent) => updateGroupInfo(e)}
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
            <Input
              value={groupData.name}
              type="text"
              label="name"
              icon={<AbcOutlined className="w-6 h-6" />}
              onChange={(e) => {
                setGroupData((prev) => ({ ...prev, name: e.target.value }));
              }}
              className=""
            />
          </div>
          <div>
            {/* <small>tag</small> */}
            <Input
              value={groupData.tag}
              label="tag"
              type="text"
              icon={<p className="">@</p>}
              onChange={(e) => {
                setGroupData((prev) => ({
                  ...prev,
                  tag: lettersAndNumbersOnly(e.target.value),
                }));
              }}
              className=""
            />
            <div></div>
          </div>
          <div>
            <small>description</small>
            <TextareaAutosize
              placeholder="enter group description..."
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
              className="w-full p-2 text-sm text-gray-700 border-none rounded-md resize-none bg-primary/10"
            />
          </div>
          <div className="flex items-center justify-between">
            <p>Locked</p>
            <Switch
              checked={groupData.locked}
              onChange={(e) => {
                setGroupData((prev) => ({
                  ...prev,
                  locked: e.target.checked,
                }));
              }}
            />
          </div>

          {groupData.locked && (
            <Input
              value={groupData.password}
              disabled={!groupData.locked}
              type="text"
              icon={<p className="">***</p>}
              placeholder="Input a new password..."
              onChange={(e) => {
                setGroupData((prev) => ({ ...prev, password: e.target.value }));
              }}
              className=""
            />
          )}

          {groupData.locked && (
            <small className="flex items-center gap-2">
              <Warning className="w-3 h-3 text-xs text-brand-yellow" /> Note: if
              you set the locked switch to true, without providing a password,
              one will be automatically generated
            </small>
          )}

          <div className="rounded-md overflow-clip">
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
