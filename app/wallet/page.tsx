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
import {Session} from "next-auth"
import {useSession} from "next-auth/react"

export default function Wallet() {
  const { triggerModal } = useContext(ModalContext);

  const {data}= useSession()
  const session:Session | any= data


  //TODO set Types
  const [walletData, setWalletData] = useState<any|null>(null)
;

useEffect(()=>{
  (async()=>{
try {
  const    res = await fetch("/api/wallet")

  const {wallet} =await res.json()
  console.log("WALLETRESPONSE",wallet)
  setWalletData(wallet);

} catch (error) {
  console.log(error)
} 

  })()
},[session])
  // const navigate = useNavigate();

  const [showBalance, setShowBalance] = useState(false);

  // if(!walletData) return <Loading/>


  return (
    <div className="flex flex-col h-screen">
      <Header title="wallet" imgShown location={WALLET} />
      <div className="h-full py-4 space-y-6">
        <div className="mx-2">
          <div className="w-full p-4 mx-auto space-y-4 text-white h-48_ bg-primary rounded-2xl overflow-clip ">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 font-semibold items-">
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
                  <span className="text-sm">₦</span>{walletData.balance.toFixed(2)}
                </p>
              ) : (
                <p className="space-x-1 text-3xl font-bold">
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
                  className="p-1 text-3xl bg-white rounded-xl text-primary"
                >
                  <PlusIcon className="w-6 h-6" />
                </Link>
                <small>Add money</small>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Link
                  href={`${WALLET}/transfer`}
                  className="p-1 text-3xl bg-white rounded-xl text-primary"
                >
                  <ArrowPathRoundedSquareIcon className="w-6 h-6" />
                </Link>
                <small>Transfer</small>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Link
                  href={`${WALLET}/withdraw`}
                  className="p-1 text-3xl bg-white rounded-xl text-primary"
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
                className="p-4 text-2xl rounded-full bg-primary/10 text-primary"
              >
                <ArrowsUpDownIcon className="w-6 h-6" />
              </Link>
              <small>Airtime</small>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link
                href={`${WALLET}/buy-data`}
                className="p-4 text-2xl rounded-full bg-primary/10 text-primary"
              >
                <ArrowsRightLeftIcon className="w-6 h-6" />
              </Link>
              <small>Data</small>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link
                href={`${WALLET}/more`}
                className="p-4 text-2xl rounded-full bg-primary/10 text-primary"
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
