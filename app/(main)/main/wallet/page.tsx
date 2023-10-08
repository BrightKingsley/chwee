import nft from "@assets/images/nft.jpg";
import { Header, ListTile } from "@/components/shared";
import Link from "next/link";
import { WALLET } from "@/constants/routes";
import { PlusIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth";
import { TransactionTile, WalletBalance } from "./components";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getWallet } from "@/lib/db";
import { ClientWallet } from "@/types/models";

import ArrowOutward from "@mui/icons-material/ArrowOutward";

import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";

import WifiProtectedSetupOutlinedIcon from "@mui/icons-material/WifiProtectedSetupOutlined";

import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";

// const getWalletData = async (serverSession: Session | null) => {
//   try {
//       headers: {
//         user_id: serverSession?.user.id!,
//       },
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export default async function Wallet() {
  const serverSession = await getServerSession(authOptions);

  if (!serverSession || !serverSession?.user || !serverSession?.user.id)
    return <h1>No User</h1>;
  const data = await getWallet({ ownerID: serverSession?.user.id });

  const walletData = data as ClientWallet | null;
  // const walletData: ClientWallet = {
  //   _id: "wyw",
  //   balance: 2000,
  //   owner: "me",
  //   transactions: [],
  // };

  return (
    <div className="flex flex-col h-screen">
      {/* <div className="fixed top-0 left-0"> */}
      <div className="shrink-0">
        <Header title="wallet" imgShown location={WALLET} />
      </div>
      {/* </div> */}
      <div className="h-full flex-1 overflow-y-auto py-4 space-y-6">
        {!walletData ? (
          <h1>No DATA</h1>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="mx-2 shrink-0">
              <div className="w-full p-4 mx-auto space-y-4 text-white h-48_ bg-primary rounded-2xl overflow-clip ">
                <WalletBalance walletData={walletData} />
                <div className="flex justify-around">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Link
                      href={`${WALLET}/add-money`}
                      className="flex items-center justify-center w-12 h-12 p-1 text-3xl transition-transform duration-150 bg-white rounded-2xl text-primary active:scale-75 active:bg-primary/50 active:text-white hover:text-white hover:outline hover:outline-white hover:outline-offset-1 hover:outline-1 hover:scale-110 hover:bg-white/30 "
                    >
                      <PlusIcon className="w-6 h-6" />
                    </Link>
                    <small>Add money</small>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Link
                      href={`${WALLET}/transfer`}
                      className="flex items-center justify-center w-12 h-12 p-1 text-3xl transition-transform duration-150 bg-white rounded-2xl text-primary active:scale-75 active:bg-primary/50 active:text-white hover:text-white hover:outline hover:outline-white hover:outline-offset-1 hover:outline-1 hover:scale-110 hover:bg-white/30 "
                    >
                      <WifiProtectedSetupOutlinedIcon className="w-6 h-6 rotate-90" />
                    </Link>
                    <small>Transfer</small>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Link
                      href={`${WALLET}/withdraw`}
                      className="flex items-center justify-center w-12 h-12 p-1 text-3xl transition-transform duration-150 bg-white rounded-2xl text-primary active:scale-75 active:bg-primary/50 active:text-white hover:text-white hover:outline hover:outline-white hover:outline-offset-1 hover:outline-1 hover:scale-110 hover:bg-white/30 "
                    >
                      <ArrowOutward className="w-6 h-6" />
                    </Link>
                    <small>Withdraw</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto text-center w-full shrink-0">
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center justify-center">
                  <Link
                    href={`${WALLET}/buy-airtime`}
                    className="flex items-center justify-center w-12 h-12 p-4 text-2xl rounded-full bg-primary/10 text-primary"
                  >
                    <SignalCellularAltOutlinedIcon className="w-6 h-6" />
                  </Link>
                  <small>Airtime</small>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Link
                    href={`${WALLET}/buy-data`}
                    className="flex items-center justify-center w-12 h-12 p-4 text-2xl rounded-full bg-primary/10 text-primary"
                  >
                    <WifiOutlinedIcon className="w-6 h-6" />
                  </Link>
                  <small>Data</small>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Link
                    href={`${WALLET}/more`}
                    className="flex items-center justify-center w-12 h-12 p-4 text-2xl rounded-full bg-primary/10 text-primary"
                  >
                    <ArrowRightIcon className="w-6 h-6" />
                  </Link>
                  <small>More</small>
                </div>
              </div>
            </div>
            <div className="space-y-2 flex-1 px-2 h-full w-full shrink-0 overflow-y-auto">
              {walletData.transactions.map((transaction, i) => (
                <ListTile key={i}>
                  <TransactionTile transactionID={transaction.toString()} />
                </ListTile>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
