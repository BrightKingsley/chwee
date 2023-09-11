"use client";

// import {
//   FaAccusoft,
//   FaArrowRight,
//   FaConnectdevelop,
//   FaEdit,
//   FaEye,
//   FaEyeSlash,
//   FaUser,
// } from "react-icons/fa";
// import {
//   BiAlarmOff,
//   BiChevronRight,
//   BiData,
//   BiMoneyWithdraw,
//   BiPlus,
//   BiTransfer,
//   BiTransferAlt,
// } from "react-icons/bi";
import nft from "@assets/images/nft.jpg";
import { AUTH, WALLET } from "@/constants/routes";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context";
import { Header } from "@/components";
import Link from "next/link";
// import { IoCellular } from "react-icons/io5";
// import { IoIosCellular, IoMdCellular } from "react-icons/io";

import {
  ChevronRightIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  BanknotesIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  ArrowRightIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/20/solid";

export default function Wallet() {
  const { triggerModal } = useContext(ModalContext);
;

  // const navigate = useNavigate();

  const [showBalance, setShowBalance] = useState(false);


  return (
    <div className="h-screen flex flex-col">
      <Header title="wallet" imgShown location={WALLET} />
      <div className="h-full py-4 space-y-6">
        <div className="mx-2">
          <div className="w-full h-48_ text-white bg-primary rounded-2xl p-4 overflow-clip mx-auto space-y-4 ">
            <div className="flex items-center justify-between">
              <div className="flex items- gap-1 font-semibold">
                <small>Available Balance</small>
                <span
                  className="text-xl cursor-pointer active:scale-90"
                  onClick={() => setShowBalance((prev) => !prev)}
                >
                  {showBalance ? (
                    <EyeIcon className="w-6 h-6" />
                  ) : (
                    <EyeSlashIcon className="w-6 h-6" />
                  )}
                </span>
              </div>
              <Link href={`${WALLET}/transaction-history`}>
                <small className="flex items-center">
                  Transactions History
                  <span>
                    <ChevronRightIcon className="w-6 h-6" />
                  </span>
                </small>
              </Link>
            </div>
            <div>
              {showBalance ? (
                <p className="text-3xl font-bold">
                  <span className="text-sm">₦</span>7.83
                </p>
              ) : (
                <p className="text-3xl font-bold space-x-1">
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                </p>
              )}
              <small>& Cashback ₦1.50</small>
            </div>
            <div className="flex justify-around">
              <div className="flex flex-col items-center justify-center gap-1">
                <Link
                  href={`${WALLET}/add-money`}
                  className="rounded-xl p-1 bg-white text-primary text-3xl"
                >
                  <PlusIcon className="w-6 h-6" />
                </Link>
                <small>Add money</small>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Link
                  href={`${WALLET}/transfer`}
                  className="rounded-xl p-1 bg-white text-primary text-3xl"
                >
                  <ArrowPathRoundedSquareIcon className="w-6 h-6" />
                </Link>
                <small>Transfer</small>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Link
                  href={`${WALLET}/withdraw`}
                  className="rounded-xl p-1 bg-white text-primary text-3xl"
                >
                  <BanknotesIcon className="w-6 h-6" />
                </Link>
                <small>Withdraw</small>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center justify-center">
              <Link
                href={`${WALLET}/buy-airtime`}
                className="bg-primary/10 text-2xl rounded-full p-4 text-primary"
              >
                <ArrowsUpDownIcon className="w-6 h-6" />
              </Link>
              <small>Airtime</small>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link
                href={`${WALLET}/buy-data`}
                className="bg-primary/10 text-2xl rounded-full p-4 text-primary"
              >
                <ArrowsRightLeftIcon className="w-6 h-6" />
              </Link>
              <small>Data</small>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link
                href={`${WALLET}/more`}
                className="bg-primary/10 text-2xl rounded-full p-4 text-primary"
              >
                <ArrowRightIcon className="w-6 h-6" />
              </Link>
              <small>More</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
