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
import { AUTH, BASE_URL, WALLET } from "@/constants/routes";
import { ModalContext } from "@/context";
import { Header } from "@/components";
import Link from "next/link";
// import { IoCellular } from "react-icons/io5";
// import { IoIosCellular, IoMdCellular } from "react-icons/io";

import {
  ChevronRightIcon,
  PlusIcon,
  BanknotesIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  ArrowRightIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/20/solid";
import { Session, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Loading from "./my_loading";
import { WalletBalance } from "./components";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getWalletData = async (session: Session | null) => {
  try {
    const res = await fetch(`${BASE_URL}/api/wallet`, {
      headers: {
        user_id: session?.user.id!,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function Wallet() {
  const session = await getServerSession(authOptions);
  const walletData = await getWalletData(session);

  return (
    <div className="flex flex-col h-screen">
      <Header title="wallet" imgShown location={WALLET} />
      <div className="h-full py-4 space-y-6">
        {!walletData || walletData.error ? (
          <h1>No DATA</h1>
        ) : (
          <>
            <div className="mx-2">
              <div className="w-full p-4 mx-auto space-y-4 text-white h-48_ bg-primary rounded-2xl overflow-clip ">
                <WalletBalance walletData={walletData} />
                <div className="flex justify-around">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Link
                      href={`${WALLET}/add-money`}
                      className="p-1 text-3xl bg-white rounded-xl text-primary active:scale-75 active:bg-primary/50 active:text-white hover:text-white hover:outline hover:outline-white hover:outline-offset-1 hover:outline-1 hover:scale-125 hover:bg-white/30 transition-transform duration-150 "
                    >
                      <PlusIcon className="w-6 h-6" />
                    </Link>
                    <small>Add money</small>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Link
                      href={`${WALLET}/transfer`}
                      className="p-1 text-3xl bg-white rounded-xl text-primary active:scale-75 active:bg-primary/50 active:text-white hover:text-white hover:outline hover:outline-white hover:outline-offset-1 hover:outline-1 hover:scale-125 hover:bg-white/30 transition-transform duration-150 "
                    >
                      <ArrowPathRoundedSquareIcon className="w-6 h-6" />
                    </Link>
                    <small>Transfer</small>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Link
                      href={`${WALLET}/withdraw`}
                      className="p-1 text-3xl bg-white rounded-xl text-primary active:scale-75 active:bg-primary/50 active:text-white hover:text-white hover:outline hover:outline-white hover:outline-offset-1 hover:outline-1 hover:scale-125 hover:bg-white/30 transition-transform duration-150 "
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
          </>
        )}
      </div>
    </div>
  );
}
