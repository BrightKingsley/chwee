"use client";
import AnimateInOut from "../AnimateInOut/AnimateInOut";
import { Spinner } from "@/app/components/mui";
import MyListTile from "../ListTile/ListTile";
import Image from "next/image";
import UserLineIcon from "remixicon-react/UserLineIcon";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";

export default function UsersModal({
  userList,
  show = false,
  loading,
  handleShowModal,
  overlay = false,
  handleItemClicked,
  handleSearch,
}: {
  userList: { tag: string; photo: string; username: string }[];
  show: boolean;
  loading: boolean;
  handleShowModal: Function;
  overlay?: boolean;
  handleItemClicked: Function;
  handleSearch?: Function;
}) {
  const [fullHeight, SetFullHeight] = useState(false);

  useEffect(() => {
    console.log({ userList });
  }, [userList]);

  const handleSearchBar = (result: any) => {
    handleSearch && handleSearch(result);
  };

  return (
    <>
      <AnimateInOut
        show={show && overlay}
        init={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        out={{ opacity: 0 }}
        onClick={() => handleShowModal()}
        title={"click to close modal"}
        className="fixed left-0 z-10 w-full h-full mx-auto cursor-pointer backdrop-blur-sm"
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
            handleShowModal();
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
            getSearchResults={handleSearchBar}
            onFocus={() => SetFullHeight(true)}
            onBlur={() => SetFullHeight(false)}
            collection="users"
            disabled={loading}
            placeholder="Search for Member"
          />
        </div>
        {loading ? (
          <div className="pt-20 mx-auto w-fit">
            <Spinner className="" />
          </div>
        ) : userList.length > 0 ? (
          userList.map(({ tag, photo, username }, i) => (
            <MyListTile
              key={tag}
              // onClick={() => handleShowModal()}
              onClick={() => handleItemClicked(tag)}
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
                    <UserLineIcon className="w-20 h-20 text-gray-200" />
                  )}
                </div>
                <div className="ml-3">
                  <p>{username}</p>
                  <small className="text-primary">{tag}</small>
                </div>
              </div>
            </MyListTile>
          ))
        ) : (
          <div className="pt-20 mx-auto w-fit">
            <p className="text-gray-700">No users available</p>
          </div>
        )}
      </AnimateInOut>
    </>
  );
}
