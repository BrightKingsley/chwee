"use client";

import { useContext, useEffect, useState } from "react";
import {
  ChevronRightIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { WalletClass } from "@/models";
import Link from "next/link";
import { WALLET } from "@/constants/routes";
import { log } from "console";

export default function WalletBalance({
  walletData,
}: {
  walletData: WalletClass | null;
}) {
  const [showBalance, setShowBalance] = useState(false);

  console.log("WALLET_DATA", walletData);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 font-semibold items-center w-fit">
          <small className="w-fit">Available</small> <small>Balance</small>
          <span
            className="text-xl flex-1 cursor-pointer ml-2 active:scale-90"
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
          <p className="text-2xl font-bold font-druk-wide-bold">
            <span className="text-sm">₦</span>
            {walletData?.balance.toFixed(2)}
          </p>
        ) : (
          <p className="space-x-1 font-blogh text-2xl w-fit ml-6">
            <span>*</span>
            <span>*</span>
            <span>*</span>
            <span>*</span>
          </p>
        )}
        <small>& Cashback ₦1.50</small>
      </div>
    </>
  );
}