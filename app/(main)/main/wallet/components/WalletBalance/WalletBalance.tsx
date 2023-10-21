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
import { ClientWallet } from "@/types/models";
import { IconButton } from "@/app/components/mui";

export default function WalletBalance({
  walletData,
}: {
  walletData: ClientWallet | null;
}) {
  const [showBalance, setShowBalance] = useState(false);

  console.log("WALLET_DATA", walletData);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 font-semibold w-fit">
          <small className="w-fit">Available</small> <small>Balance</small>
          <IconButton
            color="white"
            className="flex-1 ml-2 text-xl rounded-full"
            onClick={() => setShowBalance((prev) => !prev)}
          >
            {showBalance ? (
              <EyeIcon className="w-6 h-6" />
            ) : (
              <EyeSlashIcon className="w-6 h-6" />
            )}
          </IconButton>
        </div>
        {/* <Link href={`${WALLET}/transaction-history`}>
          <small className="flex items-center">
            Transactions History
            <span>
              <ChevronRightIcon className="w-6 h-6" />
            </span>
          </small>
        </Link> */}
      </div>
      <div>
        {showBalance ? (
          <p className="text-2xl font-bold font-druk-wide-bold">
            <span className="text-sm">₦</span>
            {walletData?.balance.toFixed(2)}
          </p>
        ) : (
          <p className="ml-6 space-x-1 text-2xl font-blogh w-fit">
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
