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
      <div className="flex items-center justify-center w-full h-full gap-3 text-red-400">
        <ErrorWarningLineIcon className="w-8 h-8" />
        <p className="text-xl font-bold">Transaction data not found</p>
        <div className="mx-auto space-y-2 w-fit">
          <small>Try Refreshing the page</small>
          <Link href={`${WALLET}/transaction-history/${params.transactionID}`}>
            <Button
              // onClick={() => refresh()}
              variant="outlined"
              className="flex items-center gap-3 px-2 py-2 mx-auto"
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
      <div className="flex-1 px-4 py-3 space-y-4 overflow-auto">
        <div className="space-y-4 overflow-x-clip">
          <div className="px-2 py-4 space-y-3 bg-white border rounded-md">
            <div className="flex items-center">
              <span className="inline-block p-2 rounded-full bg-primary/10 text-primary fill-primary">
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
              <p className="ml-2 text-gray-600">{transaction.title}</p>
              <p className="ml-auto text-2xl text-gray-800 whitespace-nowrap">
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
          <div className="mx-auto py-[2px] bg-body border border-gray-400 flex items-center relative w-fit rounded-full before:absolute before:-translate-x-full before:w-full after:w-full before:bg-gray-400 after:bg-gray-400 before:h-[1px] after:h-[1px] after:absolute after:translate-x-full">
            <small className="px-2">{transaction.date.toDateString()}</small>
          </div>
          <div className="p-1 space-y-3 bg-white border rounded-md">
            <div className="flex items-center justify-between">
              <small className="text-gray-600">Status</small>
              <small className="text-sm font-bold uppercase">
                {transaction.status === "successful" ? "success" : "fail"}
              </small>
            </div>

            <div className="flex items-center justify-between">
              <small className="text-gray-600">Bank name</small>
              <small className="text-sm font-bold">{transaction.status}</small>
            </div>

            <div className="flex items-center justify-between">
              <small className="text-gray-600">Receiver name</small>
              <small className="text-sm font-bold">
                {receiverDoc?.username}
              </small>
            </div>
            <div className="flex items-center justify-between">
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
