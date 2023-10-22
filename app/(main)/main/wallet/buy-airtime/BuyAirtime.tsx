"use client";

import Image from "next/image";
import { Ref, useContext, useEffect, useRef, useState } from "react";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import CheckboxCircleFillIcon from "remixicon-react/CheckboxCircleFillIcon";
import RadioButtonLineIcon from "remixicon-react/RadioButtonLineIcon";
import ArrowDownFillIcon from "remixicon-react/ArrowDownFillIcon";
import ArrowUpFillIcon from "remixicon-react/ArrowUpFillIcon";
import { Button, IconButton, ListItem, Switch } from "@/app/components/mui";
import { formatToNumberWithDecimal } from "@/lib/utils";
import { ClientUser } from "@/types/models";
import { AnimateInOut, UserListModal } from "@/app/components/client";
import { BASE_URL } from "@/constants/routes";
import { Amarante } from "next/font/google";
import { NotificationContext } from "@/context";
import { XMarkIcon } from "@heroicons/react/20/solid";

type AirtimeDataType = {
  amount: number;
  phone?: string;
  network?: "MTN" | "Airtel" | "Glo" | "9mobile";
  receiver?: string;
};

const networks: AirtimeDataType["network"][] = [
  "9mobile",
  "Airtel",
  "Glo",
  "MTN",
];

const topupOptions = [50, 100, 200, 500, 1000, 2000];

export default function BuyAirtime({
  balance,
  userPhone,
}: {
  userPhone?: string;
  balance: number;
}) {
  const { triggerNotification } = useContext(NotificationContext);

  const [showNetWorks, setShowNetworks] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [sendToConnect, setSendToConnect] = useState(false);
  const [airtimeData, setAirtimeData] = useState<AirtimeDataType>({
    amount: 0,
    phone: userPhone,
    network: undefined,
    receiver: "",
  });
  const [connectionsModal, setConnectionsModal] = useState<{
    loading: boolean;
    show: boolean;
    connections: ClientUser[];
    value: string;
  }>({
    loading: false,
    show: false,
    connections: [],
    value: "",
  });

  const handleHideModal = () => {
    setConnectionsModal((prev) => ({ ...prev, show: false }));
    // setSendToConnect(false);
    // setAirtimeData((prev) => ({ ...prev, receiver: undefined }));
  };
  const handleConnectionClicked = (tag: string) => {
    setAirtimeData((prev) => ({ ...prev, receiver: tag }));
    handleHideModal();
  };
  const showConnectionsModal = async () => {
    try {
      setConnectionsModal((prev) => ({ ...prev, loading: true, show: true }));
      const res = await fetch(`${BASE_URL}/api/connections`);
      const data = await res.json();
      console.log({ data });
      const connections = data as ClientUser[] | null;
      if (!connections) return;
      setConnectionsModal((prev) => ({
        ...prev,
        loading: false,
        connections,
      }));
    } catch (error) {
      console.error({ error });
      setConnectionsModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleAmountEntered = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpenPaymentModal(true);
  };

  const handleTopup = async () => {
    // try {
    // } catch (error) {
    // }
    triggerNotification("Topped Up successfully");
    setAirtimeData({
      amount: 0,
      network: "Airtel",
      phone: "",
      receiver: undefined,
    });
    setConnectionsModal({
      connections: [],
      loading: false,
      show: false,
      value: "",
    });
    setOpenPaymentModal(false);
    setSendToConnect(false);
    setShowNetworks(false);
  };

  const networkListRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (networkListRef.current) {
      networkListRef.current.style.transitionDuration = "1s";
      // networkListRef.current.style.transitionTimingFunction = "1s";

      if (showNetWorks) {
        console.log({
          showNetWorks,
          height: networkListRef.current?.scrollHeight,
        });

        networkListRef.current.style.height =
          networkListRef.current.scrollHeight.toString();
      }
    }
  }, [showNetWorks]);

  return (
    <>
      <div
        ref={networkListRef as Ref<HTMLDivElement>}
        className="rounded-b-xl shadow-md bg-white p-3 transition-all duration-200 space-y-2"
      >
        <div className="flex items-center">
          <Button
            onClick={() => setShowNetworks((prev) => !prev)}
            variant="text"
            className="flex !p-0 items-center gap-1"
          >
            <div className="rounded-full overflow-clip w-10 h-10 bg-red-400">
              {/* <Image src="" alt="" width={80} height={80} /> */}
            </div>
            <span className="">
              {showNetWorks ? (
                <ArrowUpFillIcon className="w-3 h-3 fill-primary text-primary" />
              ) : (
                <ArrowDownFillIcon className="w-3 h-3" />
              )}
            </span>
          </Button>
          <div className="flex ml-2 items-center">
            {sendToConnect ? (
              <div className="font-bold text-gray-700 font-druk-wide-bold flex-1">
                {!airtimeData.receiver && (
                  <p className="text-gray-600">@UserTag</p>
                )}
                {airtimeData.receiver && (
                  <p className="">{airtimeData.receiver}</p>
                )}
              </div>
            ) : (
              <input
                value={airtimeData.phone}
                type="tel"
                placeholder="080 1234 5678"
                className="focus:outline-none focus:border-none font-bold max-w-[12rem]"
                onChange={(e) =>
                  setAirtimeData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            )}
            {airtimeData.phone && airtimeData.phone.length > 0 && (
              <CloseCircleLineIcon
                onClick={() =>
                  setAirtimeData((prev) => ({ ...prev, phone: "" }))
                }
                className="w-3 h-3"
              />
            )}
          </div>

          <div className="ml-auto w-fit">
            <Switch
              checked={sendToConnect}
              onChange={(e) => {
                setSendToConnect(e.target.checked);
                e.target.checked ? showConnectionsModal() : handleHideModal();
              }}
              className="ml-auto"
            />
          </div>
        </div>
        <div>
          <div
            ref={networkListRef as Ref<HTMLDivElement>}
            className={`${
              showNetWorks ? "" : "h-0"
            } px-3 py-2 space-y-1 transition-transform duration-1000 bg-primary/10 rounded-md`}
            // className="rounded-md"
          >
            {networks.map((network, i) => (
              <ListItem
                key={i}
                onClick={() => setAirtimeData((prev) => ({ ...prev, network }))}
                className="flex items-center py-1"
              >
                <div className="rounded-full overflow-clip w-10 bg-brand-yellow h-10">
                  {/* <Image
                      src={`/images/networks/${network}.png`}
                      alt=""
                      width={80}
                      height={80}
                    /> */}
                </div>
                <p className="pl-2">{network}</p>
                <span className="inline-block ml-auto">
                  {airtimeData.network === network ? (
                    <CheckboxCircleFillIcon className="w-3 h-3  fill-primary text-primary" />
                  ) : (
                    <RadioButtonLineIcon className="w-3 h-3  fill-gray-400 text-gray-400" />
                  )}
                </span>
              </ListItem>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-3 px-3 py-4 bg-white">
        <p className="font-bold">Top up</p>
        <div className="grid grid-cols-3 gap-2">
          {topupOptions.map((option, i) => (
            <Button
              key={i}
              variant="text"
              onClick={() => {
                setAirtimeData((prev) => ({ ...prev, amount: option }));
                setOpenPaymentModal(true);
              }}
              className="px-4 py-6 bg-primary/10 font-druk-wide-bold"
            >
              ₦{option}
            </Button>
          ))}
        </div>
        <form
          onSubmit={handleAmountEntered}
          className="flex items-center justify-between py-4 gap-2"
        >
          <div className="flex p-2 items-center gap-1 bg-primary/10 rounded-md">
            <p className="font-bold ">₦</p>
            <input
              type="number"
              placeholder="50-500,000"
              value={airtimeData.amount > 0 ? airtimeData.amount : ""}
              onChange={(e) =>
                setAirtimeData((prev) => ({
                  ...prev,
                  amount: parseFloat(formatToNumberWithDecimal(e.target.value)),
                }))
              }
              className="focus:outline-none text-xl w-fit focus:border-none font-bold p-2 bg-transparent max-w-[12rem]"
            />
          </div>
          <div className="shrink-0">
            <Button
              type="submit"
              disabled={airtimeData.amount < 50}
              className="rounded-full text-xs whitespace-nowrap font-bold py-2 px-3 font-druk-wide-bold"
            >
              Pay{airtimeData.amount > 50 && ` ₦${airtimeData.amount}`}
            </Button>
          </div>
        </form>
      </div>
      <UserListModal
        handleItemClicked={handleConnectionClicked}
        handleShowModal={handleHideModal}
        show={connectionsModal.show}
        loading={connectionsModal.loading}
        userList={connectionsModal.connections}
        overlay
      />
      <AnimateInOut
        init={{ translateY: "100%" }}
        out={{ translateY: "100%" }}
        animate={{ translateY: "60%" }}
        transition={{ type: "keyframes" }}
        show={openPaymentModal && airtimeData.amount > 50}
        className={`fixed left-0 space-y-4 bg-body rounded-t-3xl h-full mx-auto w-full z-20 pt-4`}
      >
        <div className="space-y-2 px-3 relative w-full h-full">
          <div className="absolute -top-3 right-0">
            <IconButton
              onClick={() => {
                setOpenPaymentModal(false);
              }}
              className="rounded-full"
            >
              <XMarkIcon className="w-10 h-10 p-1 text-gray-600 fill-gray-600" />
            </IconButton>
          </div>
          <p className="text-gray-600 text-center">Available Balance</p>
          <p className="text-3xl font-bold text-center">
            ₦{balance.toFixed(2)}
          </p>
          <div className="flex mt-1 justify-between">
            <small className="text-gray-600">Your new balance will be</small>
            <p className="text-gray-800 font-bold">
              ₦{(balance - airtimeData.amount).toFixed(2)}
            </p>
          </div>
        </div>
        <Button
          onClick={handleTopup}
          fullWidth
          className="rounded-full font-druk-wide-bold"
        >
          Confirm
        </Button>
      </AnimateInOut>
    </>
  );
}
