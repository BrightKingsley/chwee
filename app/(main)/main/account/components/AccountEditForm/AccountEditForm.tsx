"use client";

import { ModalContext, NotificationContext } from "@/context";
import { Input } from "@material-tailwind/react";
import { Card, IconButton } from "@/components/mui";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import AddPhotoAlternateOutlined from "@mui/icons-material/AddPhotoAlternateOutlined";
import AbcOutlined from "@mui/icons-material/AbcOutlined";
import Tag from "@mui/icons-material/TagFaces";
import Close from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { Overlay } from "@/components/shared";
import { Button } from "@/components/mui";
import Link from "next/link";
import { ACCOUNT } from "@/constants/routes";

export default function AccountEditForm({ show }: { show: boolean }) {
  const { data } = useSession();
  const session = data;

  // Context
  const {} = useContext(NotificationContext);

  // State
  const [previewImage, setPreviewImage] = useState<any>("");

  const [updateUser, setUpdateUser] = useState({
    username: "",
    tag: "",
    photo: "",
  });

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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="z-20">
      <Overlay show={show}>
        <Card className="relative bg-white border w-80">
          <form className="w-full h-full p-4 space-y-4" onSubmit={handleSubmit}>
            <div className="absolute top-2 right-2">
              <Link href={ACCOUNT}>
                <IconButton
                  type="reset"
                  title="close edit form"
                  aria-label="close edit form"
                  onClick={() => {
                    setPreviewImage("");
                    setUpdateUser({
                      photo: "",
                      tag: "",
                      username: "",
                    });
                  }}
                  className="rounded-full"
                >
                  <Close className="w-6 h-6" />
                </IconButton>
              </Link>
            </div>
            <div className="relative mx-auto w-fit">
              <div className="flex items-center justify-center w-24 h-24 border rounded-full overflow-clip">
                {previewImage ? (
                  <Image src={previewImage} alt="new" fill />
                ) : (
                  <AccountCircle className="w-20 h-20 text-gray-200" />
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
                      return setUpdateUser((prev) => ({
                        ...prev,
                        photo: target.value,
                      }));
                    }}
                  />
                </IconButton>
              </div>
            </div>
            <div className="w-full space-y-4">
              <div>
                <Input
                  onChange={(e) => {
                    setUpdateUser((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                  }}
                  value={updateUser.username}
                  label="username"
                  icon={<AbcOutlined className="w-6 h-6" />}
                  type="text"
                />
              </div>
              <div>
                <Input
                  onChange={(e) => {
                    setUpdateUser((prev) => ({
                      ...prev,
                      tag: e.target.value,
                    }));
                  }}
                  value={updateUser.tag}
                  icon={<p className="">@</p>}
                  label="tag"
                  type="text"
                />
              </div>
            </div>
            <Button type="reset" fullWidth>
              Save Changes
            </Button>
          </form>
        </Card>
      </Overlay>
    </div>
  );
}
