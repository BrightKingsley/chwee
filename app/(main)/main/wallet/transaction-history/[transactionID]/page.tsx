import { Header } from "@/app/components/client";
import { Button } from "@/app/components/mui";
import { getTransactionByID, getUserByID } from "@/lib/db";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import ArrowLeftRightLineIcon from "remixicon-react/ArrowLeftRightLineIcon";
import BankLineIcon from "remixicon-react/BankLineIcon";
import SimCardLineIcon from "remixicon-react/SimCardLineIcon";
import WifiLineIcon from "remixicon-react/WifiLineIcon";
import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon";
import { ShareTransaction } from "../../components";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import Link from "next/link";
import { WALLET } from "@/constants/routes";

export default async function Transaction({
  params,
}: {
  params: { transactionID: string };
}) {
  const transaction = await getTransactionByID({
    transactionID: params.transactionID,
  });

  if (!transaction)
    return (
      <div className="flex items-center justify-center text-red-400 w-full h-full gap-3">
        <ErrorWarningLineIcon className="w-8 h-8" />
        <p className="text-xl font-bold">Transaction data not found</p>
        <div className="space-y-2 w-fit mx-auto">
          <small>Try Refreshing the page</small>
          <Link href={`${WALLET}/transaction-history/${params.transactionID}`}>
            <Button
              // onClick={() => refresh()}
              variant="outlined"
              className="flex px-2 py-2 gap-3 mx-auto items-center"
            >
              <p>refresh</p>
              <RefreshLineIcon className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    );

  const receiverDoc = await getUserByID({ userID: transaction.receiver });
  const senderDoc = await getUserByID({ userID: transaction.sender });

  console.log({ transaction });

  // let transactionIcon: React.JSX.Element;
  // switch (transaction.type) {
  //   case "airtime":
  //     transactionIcon = <SimCardLineIcon className="w-3 h-3" />;
  //     break;

  //   case "data":
  //     transactionIcon = <WifiLineIcon className="w-3 h-3" />;

  //   case "deposit":
  //     transactionIcon = <ArrowDownIcon className="w-3 h-3" />;

  //   case "transfer":
  //     transactionIcon = <ArrowLeftRightLineIcon className="w-3 h-3" />;

  //   case "withdrawal":
  //     transactionIcon = <BankLineIcon className="w-3 h-3" />;

  //   default:
  //     console.log({ type: transaction.type });
  //     transactionIcon = <ArrowLeftRightLineIcon className="w-3 h-3" />;
  //     break;
  // }

  return (
    <div className="flex flex-col">
      <div className="shrink-0">
        <Header title="Transaction Details" />
      </div>
      <div className="px-4 py-3 space-y-3 flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="space-y-3 py-4 px-2">
            <div className="flex items-center">
              <span className="inline-block bg-primary/10 text-primary fill-primary rounded-full p-2">
                {/* {transactionIcon} */}
                {transaction.type === "airtime" ? (
                  <SimCardLineIcon className="w-3 h-3" />
                ) : transaction.type === "data" ? (
                  <WifiLineIcon className="w-3 h-3" />
                ) : transaction.type === "deposit" ? (
                  <ArrowDownIcon className="w-3 h-3" />
                ) : transaction.type === "transfer" ? (
                  <ArrowLeftRightLineIcon className="w-3 h-3" />
                ) : (
                  <BankLineIcon className="w-3 h-3" />
                )}
              </span>
              <p className="text-gray-600 ml-2">{transaction.title}</p>
              <p className="text-gray-800 ml-auto text-2xl whitespace-nowrap">
                {transaction.type === "deposit" ? "+" : "-"}₦
                {transaction.amount}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <small className="text-gray-600">Order amount</small>
              <small className="text-gray-600">₦{transaction.amount}</small>
            </div>
            <div className="flex items-center justify-between">
              <small className="text-gray-600">Fee</small>
              <small className="text-gray-600">₦{0}.00</small>
            </div>
          </div>
          <div className="mx-auto py-[2px] bg-body border border-gray-400 flex items-center relative w-fit rounded-full before:absolute before:-translate-x-full before:w-11/12 after:w-11/12 before:bg-gray-400 after:bg-gray-400 before:h-[1px] after:h-[1px] after:absolute after:translate-x-full">
            <small className="px-2">{transaction.date.toDateString()}</small>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <small className="text-gray-600">Status</small>
              <small className="text-sm uppercase font-bold">
                {transaction.status === "successful" ? "success" : "fail"}
              </small>
            </div>

            <div className="flex justify-between items-center">
              <small className="text-gray-600">Bank name</small>
              <small className="text-sm font-bold">{transaction.status}</small>
            </div>

            <div className="flex justify-between items-center">
              <small className="text-gray-600">Receiver name</small>
              <small className="text-sm font-bold">
                {receiverDoc?.username}
              </small>
            </div>
            <div className="flex justify-between items-center">
              <small className="text-gray-600">Receiver tag</small>
              <small className="text-sm font-bold">{receiverDoc?.tag}</small>
            </div>
          </div>
        </div>
        <ShareTransaction />
      </div>
    </div>
  );
}
