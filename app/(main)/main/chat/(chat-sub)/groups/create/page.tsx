"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { BASE_URL } from "@/constants/routes";
import { TextareaAutosize } from "@mui/material";
import Image from "next/image";
import { Button, IconButton, Switch } from "@/components/mui";

import Group from "@mui/icons-material/Group";
import AddPhotoAlternateOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";

type GroupCreate = {
  description: string;
  name: string;
  owner: string;
  tag: string;
  photo: string;
  password: boolean;
};

export default function CreateGroup() {
  const { data } = useSession();
  const session: Session | any = data;

  const [groupData, setGroupData] = useState<GroupCreate>({
    description: "",
    name: "",
    tag: "",
    owner: session?.user.id,
    password: false,
    photo: "",
  });

  const [previewImage, setPreviewImage] = useState<any>("");

  const readURI = (img: any) => {
    console.log("READ_REACHED", previewImage);
    if (img) {
      let reader = new FileReader();
      reader.onload = function (ev: ProgressEvent<FileReader>) {
        setPreviewImage(ev.target?.result);
      };
      return reader.readAsDataURL(img);
    }
  };

  useEffect(() => {
    console.log("CHECK_SESSION", session);
    setGroupData((prev) => ({ ...prev, owner: session?.user.id }));
  }, [session]);

  const handleCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log(groupData);

    const response = await fetch(`${BASE_URL}/api/groups/${groupData.owner}`, {
      method: "POST",
      body: JSON.stringify(groupData),
    });

    const data = await response.json();

    console.log("GROP_POST_DATA", data, response);
  };

  return (
    <div className="">
      <form
        onSubmit={(e: React.SyntheticEvent) => handleCreate(e)}
        className="mx-2 md:mx-14 mt-20 shadow-lg bg-white p-4 rounded-lg space-y-3"
      >
        <div className="w-fit mx-auto relative">
          <div className="border w-24 h-24 rounded-full flex items-center justify-center overflow-clip">
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
                // value={""}
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e: any) => {
                  const target = e.target as HTMLInputElement;

                  // @ts-ignore TODO
                  const img = Object.values<any>(target.files)[0];

                  console.log("IMGS", img);
                  readURI(img);
                  //TODO COMEBACK ADD_TYPES
                  //@ts-ignore
                  return setGroupData((prev) => ({
                    ...prev,
                    photo: target.value,
                  }));
                }}
              />
            </IconButton>
          </div>
        </div>

        <div>
          <small>name</small>
          <input
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
          <Button fullWidth>Submit</Button>
        </div>
      </form>
    </div>
  );
}
