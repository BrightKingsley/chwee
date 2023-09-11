import { AUTH } from "@/constants/routes";
import { useContext } from "react";
import {  ModalContext, NotificationContext } from "@/context";
import { Header } from "@/components";
import Image from "next/image"

export default function Account() {
  // const navigate = useNavigate();
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);
  // const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
        <div className="h-screen flex flex-col">
          <Header title="My Account" />
          <div className="h-full py-4">
            <div className="space-y-4">
              <div className="w-32 h-32 relative rounded-full overflow-clip mx-auto">
                <Image src={""} alt="" />
              </div>
              <div className="mx-auto w-fit text-center">
                <p className="font-bold text-3xl">{"user.username"}</p>
                <p className="tetx-2xl">@{"user.tag"}</p>
              </div>
            </div>
            <div className="space-y-2 px-2">
              <small className="font-bold">account actions</small>
              <div>
                <button className="bg-primary/10 p-2 rounded-md w-full active:scale-90 active:shadow-none duration-100 transition-all hover:shadow-md   hover:shadow-primary/20 ">
                  change username
                </button>
              </div>
              <div>
                <button className="bg-primary/10 p-2 rounded-md w-full active:scale-90 active:shadow-none duration-100 transition-all hover:shadow-md   hover:shadow-primary/20 ">
                  change password
                </button>
              </div>
            </div>
            <div className="mx-2 mt-[80px]">
              <button
                onClick={() => {
                  triggerModal({
                    cancel: () => triggerModal,
                    confirm: () => () => {
                      // navigate(AUTH);
                      triggerNotification("notify!")
                    },
                    message: "Are you sure you want to logout?",
                  });
                }}
                className="bg-primary text-white font-bold p-2 rounded-md w-full active:scale-90 active:shadow-none duration-100 transition-all hover:shadow-md hover:shadow-primary/20 "
              >
                log out
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
