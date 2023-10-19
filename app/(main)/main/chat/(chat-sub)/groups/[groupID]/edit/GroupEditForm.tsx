"use client";

import { useContext, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { BASE_URL, GROUPS } from "@/constants/routes";
// import { TextareaAutosize } from "@mui/material";
import Image from "next/image";
import {
  Button,
  IconButton,
  Input,
  Switch,
  Textarea,
} from "@/app/components/mui";
import GroupLineIcon from "remixicon-react/GroupLineIcon";
import ImageLineIcon from "remixicon-react/ImageLineIcon";
import { NotificationContext } from "@/context";
import Link from "next/link";
import { ClientGroup } from "@/types/models";
import { useImageUpload } from "@/hooks";
import { lettersAndNumbersOnly } from "@/lib/utils";
import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon";

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
      name: groupData.name,
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
    <form
      onSubmit={(e: React.SyntheticEvent) => updateGroupInfo(e)}
      className="p-4 pt-16 mx-2 space-y-3 bg-white rounded-lg md:mx-14 md:shadow-lg md:border"
    >
      <div
        className="relative mx-auto cursor-pointer w-fit"
        {...getRootProps()}
      >
        <div className="flex items-center justify-center w-24 h-24 border rounded-full overflow-clip">
          {previewImage ? (
            <Image src={previewImage} alt="new" fill />
          ) : (
            <GroupLineIcon size={20} className="w-20 h-20 text-gray-200" />
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
              <ImageLineIcon className="w-6 h-6 fill-primary" />
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

      <div className="mt-6">
        <Input
          value={groupData.name}
          type="text"
          label="name"
          icon={<p>ABC</p>}
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
        {/* <small>description</small> */}
        <Textarea
          // placeholder="enter group description..."
          value={groupData.description}
          rows={5}
          label="description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setGroupData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="w-full p-2 text-sm text-gray-700 rounded-md resize-none bg-primary/10"
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
          <ErrorWarningLineIcon className="w-3 h-3 text-xs text-brand-yellow" />{" "}
          Note: if you set the locked switch to true, without providing a
          password, one will be automatically generated
        </small>
      )}

      <div className="rounded-md overflow-clip">
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
}

// remixicon-react @mui/material @emotion/styled @emotion/react
