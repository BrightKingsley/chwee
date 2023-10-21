"use client";

import Image from "next/image";
import { Ref, useEffect, useRef, useState } from "react";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import CheckboxCircleFillIcon from "remixicon-react/CheckboxCircleFillIcon";
import RadioButtonLineIcon from "remixicon-react/RadioButtonLineIcon";
import ArrowDownFillIcon from "remixicon-react/ArrowDownFillIcon";
import ArrowUpFillIcon from "remixicon-react/ArrowUpFillIcon";
import { Button, IconButton, ListItem, Switch } from "@/app/components/mui";
import { formatToNumberWithDecimal } from "@/lib/utils";
import { ClientUser } from "@/types/models";
import { UserListModal } from "@/app/components/client";
import { BASE_URL } from "@/constants/routes";

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
  const [showNetWorks, setShowNetworks] = useState(false);
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
    setSendToConnect(false);
    setAirtimeData((prev) => ({ ...prev, receiver: undefined }));
  };
  const handleConnectionClicked = (tag: string) => {
    setAirtimeData((prev) => ({ ...prev, receiver: tag }));
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
        className="rounded-b-xl bg-white p-3 transition-all duration-200"
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
          <div className="flex items-center">
            {sendToConnect ? (
              <div className="font-bold text-gray-700 font-druk-wide-bold">
                <p className="text-gray-600">@UserTag</p>
                <p className="">{airtimeData.receiver}</p>
              </div>
            ) : (
              <input
                value={airtimeData.phone}
                type="tel"
                placeholder="080 1234 5678"
                className="focus:outline-none focus:border-none font-bold"
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
          {/* <Switch
            checked={sendToConnect}
            onChange={(e) => {
              setSendToConnect(e.target.checked);
              e.target.checked && showConnectionsModal();
            }}
          >
            {sendToConnect ? "@" : "#"}
          </Switch> */}
          <Switch
            checked={sendToConnect}
            onChange={(e) => {
              setSendToConnect(e.target.checked);
              e.target.checked ? showConnectionsModal() : handleHideModal();
            }}
          />
        </div>
        <div>
          <div
            ref={networkListRef as Ref<HTMLDivElement>}
            className={`${
              showNetWorks ? "" : "h-0"
            } px-3 transition-transform duration-1000`}
            // className="rounded-md"
          >
            {networks.map((network, i) => (
              <ListItem
                key={i}
                onClick={() => setAirtimeData((prev) => ({ ...prev, network }))}
                className="flex items-center py-1"
              >
                <div className="rounded-full overflow-clip w-10 h-10">
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
              className="py-3 px-4 bg-primary/10 font-druk-wide-bold"
            >
              ₦{option}
            </Button>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between my-3"
        >
          <div className="flex relative after:w-11/12 after:bg-gray-800 after:inset-0 after:top-full after:absolute flex-1 p-2 items-center gap-2">
            <p className="font-bold">₦</p>
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
              className="focus:outline-none focus:border-none font-bold"
            />
          </div>
          <Button
            type="submit"
            disabled={airtimeData.amount < 50}
            className="rounded-full font-bold py-1 px-2"
          >
            Pay{airtimeData.amount > 50 && ` ₦${airtimeData.amount}`}
          </Button>
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
    </>
  );
}
