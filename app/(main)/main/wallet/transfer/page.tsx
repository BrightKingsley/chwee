import { Header } from "@/app/components/client";
import { WALLET } from "@/constants/routes";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import BankLineIcon from "remixicon-react/BankLineIcon";
import WalletLineIcon from "remixicon-react/WalletLineIcon";
import { ListItem } from "@/app/components/mui";

export default function Transfer() {
  return (
    <div className="">
      <Header title="Add Money" />
      <div className="w-full h-full px-1 mt-8 space-y-2">
        <div className="w-full h-16 ">
          <ListItem className="!p-0">
            <Link
              href={`${WALLET}/transfer/chwee`}
              className="w-full h-full px-2 py-4 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 text-start flex items-center gap-3 text-gray-600 "
            >
              <WalletLineIcon className="w-6 h-6 text-primary" />
              <p>To Chwee Wallet</p>
              <ChevronRightIcon className="w-6 h-6 ml-auto" />
            </Link>
          </ListItem>
        </div>
        <div className="w-full h-16">
          <ListItem className="!p-0">
            <Link
              href={`${WALLET}/transfer/bank`}
              className="w-full h-full px-2 py-4 transition-all duration-100 rounded-md bg-primary/10 active:scale-90 active:shadow-none hover:shadow-md hover:shadow-primary/20 text-start flex items-center gap-3 text-gray-600"
            >
              <BankLineIcon className="w-6 h-6 text-primary" />
              <p>To Bank Account</p>
              <ChevronRightIcon className="w-6 h-6 ml-auto" />
            </Link>
          </ListItem>
        </div>
      </div>
    </div>
  );
}
