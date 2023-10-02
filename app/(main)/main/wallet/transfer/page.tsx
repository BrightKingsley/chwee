import { Button, Header } from "@/components/shared";
import { WALLET } from "@/constants/routes";
import {
  BuildingOfficeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Transfer() {
  return (
    <div className="">
      <Header title="Add Money" />
      <div className="w-full h-full px-1 mt-8 space-y-2">
        <div className="w-full h-16 ">
          <Link
            href={`${WALLET}/transfer/chwee`}
            className="w-full h-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 text-start flex items-center gap-3 text-gray-600 "
          >
            <WalletIcon className="w-6 h-6 text-primary" />
            <p>To Chwee Wallet</p>
            <ChevronRightIcon className="w-6 h-6 ml-auto" />
          </Link>
        </div>
        <div className="w-full h-16">
          <Link
            href={`${WALLET}/transfer/bank`}
            className="w-full h-full p-2 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 text-start flex items-center gap-3 text-gray-600"
          >
            <BuildingOfficeIcon className="w-6 h-6 text-primary" />
            <p>To Bank Account</p>
            <ChevronRightIcon className="w-6 h-6 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}
