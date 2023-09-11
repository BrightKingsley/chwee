"use client"

import { AUTH } from "@/constants/routes";
import { useContext } from "react";
import {  ModalContext, NotificationContext } from "@/context";
import { Header } from "@/components";
import Image from "next/image"

export default function Account() {
  // const navigate = useNavigate();
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  console.log()

  return (
    <>
        <div className="flex flex-col h-screen">
          <Header title="My Account" />
          <div className="h-full py-4">
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-clip">
                <Image src={""} alt="" />
              </div>
              <div className="mx-auto text-center w-fit">
                <p className="text-3xl font-bold">{"user.username"}</p>
                <p className="tetx-2xl">@{"user.tag"}</p>
              </div>
            </div>
            <div className="px-2 space-y-2">
              <small className="font-bold">account actions</small>
              <div>
                <button className="w-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 ">
                  change username
                </button>
              </div>
              <div>
                <button className="w-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 ">
                  change password
                </button>
              </div>
            </div>
            <div className="mx-2 mt-[80px]">
              <button
                onClick={() => {
                  console.log("logout clicked")
                  triggerModal({
                    cancel: () => triggerModal,
                    confirm: () => () => {
                      // navigate(AUTH);
                      triggerNotification("notify!")
                    },
                    message: "Are you sure you want to logout?",
                  });
                }}
                className="w-full p-2 font-bold text-white transition-all duration-100 rounded-md bg-primary active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 "
              >
                log out
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
