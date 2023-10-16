"use client";
import AnimateInOut from "../AnimateInOut/AnimateInOut";
import { Spinner } from "@/app/components/mui";
import MyListTile from "../ListTile/ListTile";
import Image from "next/image";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

export default function UsersModal({
  userList,
  show = false,
  loading,
  setModal,
  overlay = false,
}: {
  userList: { tag: string; photo: string; username: string }[];
  show: boolean;
  loading: boolean;
  setModal: Function;
  overlay?: boolean;
}) {
  const [fullHeight, SetFullHeight] = useState(false);

  return (
    <>
      <AnimateInOut
        show={show && overlay}
        init={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        out={{ opacity: 0 }}
        onClick={() => setModal((prev: any) => ({ ...prev, show: false }))}
        title={"click to close modal"}
        className="fixed left-0 z-10 w-full h-full mx-auto space-y-2 cursor-pointer backdrop-blur-sm rounded-t-3xl"
      />
      <AnimateInOut
        init={{ translateY: "100%" }}
        out={{ translateY: "100%" }}
        show={show}
        animate={{ translateY: 0, top: fullHeight ? "10%" : "40%" }}
        transition={{ type: "keyframes" }}
        drag="y"
        dragElastic={{
          bottom: 0.5,
          top: 0.5,
        }}
        dragDirectionLock={true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={(e: PointerEvent, info) => {
          const offset = info.offset.y;

          if (offset > 100) {
            SetFullHeight(false);
            setModal((prev: any) => ({ ...prev, show: false }));
          }
          if (offset < -100) {
            SetFullHeight(true);
          }
        }}
        className={`fixed left-0 space-y-2 bg-body rounded-t-3xl h-full mx-auto w-full z-20 cursor-grab active:cursor-grabbing`}
      >
        <div className="w-1/3 h-1 mx-auto my-3 bg-gray-300 rounded-full" />
        <div className="px-6">
          <SearchBar
            onFocus={() => SetFullHeight(true)}
            onBlur={() => SetFullHeight(false)}
            collection="members"
            disabled={loading}
            placeholder="Search for Member"
          />
        </div>
        {loading ? (
          <div className="pt-20 mx-auto w-fit">
            <Spinner className="" />
          </div>
        ) : (
          userList.map(({ tag, photo, username }, i) => (
            <MyListTile
              key={tag}
              onClick={() => setModal((prev: any) => ({ ...prev, value: tag }))}
            >
              <div className="flex items-center p-2">
                <div className="w-10 h-10 rounded-full overflow-clip">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={username}
                      fill
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <AccountCircle className="w-20 h-20 text-gray-200" />
                  )}
                </div>
                <div className="ml-3">
                  <p>{username}</p>
                  <small className="text-primary">{tag}</small>
                </div>
              </div>
            </MyListTile>
          ))
        )}
      </AnimateInOut>
    </>
  );
}
