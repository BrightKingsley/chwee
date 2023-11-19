"use client";
import { OptionsMenu } from "@/app/components/client";
import { BASE_URL } from "@/constants/routes";
import { ModalContext, NotificationContext } from "@/context";
import { IconButton } from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";
import More2LineIcon from "remixicon-react/More2LineIcon";

export default function AccountDeleteButton() {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);

  const [showOptions, setShowOptions] = useState(false);

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!data) return triggerNotification("Couldn't delete account");
      console.log("DELETE_DATA", { data });
      triggerNotification(data);
      return signOut();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="relative">
      <IconButton onClick={() => setShowOptions(true)}>
        <More2LineIcon className="text-gray-700" />
      </IconButton>
      <div className="absolute top-full right-1/2">
        <OptionsMenu
          options={[
            {
              label: <p className="text-red-600">Delete Account</p>,
              onClick: () => {
                triggerModal({
                  clickToDisable: true,
                  confirm: deleteAccount,
                  cancel: triggerModal,
                  message: (
                    <p>
                      Are you sure you want to{" "}
                      <span className="text-red-400">Delete</span> account. This
                      action is <span className="text-red-400">permanent</span>
                    </p>
                  ),
                });
                setShowOptions(false);
              },
            },
          ]}
          setShow={setShowOptions}
          show={showOptions}
        />
      </div>
    </div>
  );
}
