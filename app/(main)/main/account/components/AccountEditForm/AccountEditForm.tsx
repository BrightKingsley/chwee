"use client";

import { ModalContext, NotificationContext } from "@/context";
import { Input } from "@material-tailwind/react";
import { Card, IconButton, Spinner } from "@/components/mui";
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
import { ACCOUNT, BASE_URL } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/hooks";

export default function AccountEditForm({ show }: { show: boolean }) {
  const { data } = useSession();
  const session = data;

  // Context
  const { triggerNotification } = useContext(NotificationContext);

  // State
  const [previewImage, setPreviewImage] = useState<any>("");
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  const [updateUser, setUpdateUser] = useState<{
    username: string;
    tag: string;
    loading: boolean;
  }>({
    username: "",
    tag: "",
    loading: false,
  });

  const { getInputProps, getRootProps, startUpload } = useImageUpload({
    endpoint: "userPhoto",
    setImg: setSelectedImage,
  });

  const { push } = useRouter();

  if (!(session && session.user && session.user.id)) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUpdateUser((prev) => ({ ...prev, loading: true }));
    try {
      let photoURL: string = "";
      if (selectedImage.length > 0) {
        triggerNotification("Image Uploading...");
        const uploadImage = await startUpload(selectedImage);
        console.log({ uploadImage });
        if (!uploadImage || uploadImage.length < 1) {
          setUpdateUser((prev) => ({ ...prev, loading: false }));
          return triggerNotification("Couldn't  Update photo, please retry");
        }
        photoURL = uploadImage[0].url;
      }

      const response = await fetch(`${BASE_URL}/api/users/${session.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          username: updateUser.username,
          tag: updateUser.tag,
          photo: photoURL,
        }),
      });
      const data = await response.json();
      console.log({ data });
      if (data.message !== "success") {
        setUpdateUser((prev) => ({ ...prev, loading: false }));
        return triggerNotification("Couldn't Update Details. Try again");
      }
      setUpdateUser((prev) => ({ ...prev, loading: false }));
      triggerNotification("Details Updated Successfully");
      setUpdateUser((prev) => ({ ...prev, tag: "", username: "" }));
      return push(ACCOUNT);
    } catch (error) {
      console.error({ error });
      setUpdateUser((prev) => ({ ...prev, loading: false }));
      return triggerNotification("Couldn't Update Details. Try again");
    }
  };

  const readURI = (img: any) => {
    if (img) {
      let reader = new FileReader();
      reader.onload = function (ev: ProgressEvent<FileReader>) {
        setPreviewImage(ev.target?.result);
      };
      return reader.readAsDataURL(img);
    }
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
                    setUpdateUser((prev) => ({
                      ...prev,
                      tag: "",
                      username: "",
                    }));
                  }}
                  className="rounded-full"
                >
                  <Close className="w-6 h-6" />
                </IconButton>
              </Link>
            </div>
            <div className="relative mx-auto w-fit">
              <div
                {...getRootProps()}
                className="flex items-center justify-center w-24 h-24 border rounded-full overflow-clip"
              >
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
                    {...getInputProps()}
                    type="file"
                    id="image"
                    accept="image/*"
                    hidden
                    onInput={(e: any) => {
                      const target = e.target as HTMLInputElement;

                      // @ts-ignore TODO
                      const img = Object.values<any>(target.files)[0];

                      readURI(img);
                      //TODO COMEBACK ADD_TYPES
                      //@ts-ignore
                      // return setUpdateUser((prev) => ({
                      //   ...prev,
                      //   photo: target.value,
                      // }));
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
            <Button
              type="submit"
              fullWidth
              className="flex items-center justify-center"
            >
              {updateUser.loading ? (
                // @ts-ignore
                <Spinner color="white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Card>
      </Overlay>
    </div>
  );
}
