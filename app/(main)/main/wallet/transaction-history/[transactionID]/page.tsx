import { Header } from "@/app/components/client";
import { getTransactionByID, getUserByID } from "@/lib/db";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import ArrowLeftRightLineIcon from "remixicon-react/ArrowLeftRightLineIcon";
import BankLineIcon from "remixicon-react/BankLineIcon";
import SimCardLineIcon from "remixicon-react/SimCardLineIcon";
import WifiLineIcon from "remixicon-react/WifiLineIcon";
import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon";
import { ShareTransaction } from "../../components";

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
        <p className="text-2xl">Transaction data not found</p>
      </div>
    );

  const receiverDoc = await getUserByID({ userID: transaction.receiver });
  const senderDoc = await getUserByID({ userID: transaction.sender });

  let transactionIcon: React.JSX.Element;
  switch (transaction.type) {
    case "airtime":
      transactionIcon = <SimCardLineIcon className="w-6 h-6" />;
      break;

    case "data":
      transactionIcon = <WifiLineIcon className="w-6 h-6" />;

    case "deposit":
      transactionIcon = <ArrowDownIcon className="w-6 h-6" />;

    case "transfer":
      transactionIcon = <ArrowLeftRightLineIcon className="w-6 h-6" />;

    case "withdrawal":
      transactionIcon = <BankLineIcon className="w-6 h-6" />;

    default:
      transactionIcon = <ArrowLeftRightLineIcon className="w-6 h-6" />;
      break;
  }

  return (
    <div className="flex flex-col">
      <div className="shrink-0">
        <Header title="Transaction Details" />
      </div>
      <div className="px-4 py-3 space-y-3 flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="space-y-3 p-4">
            <div className="flex items-center">
              <span className="inline-block bg-primary/10 text-primary fill-primary rounded-full p-2">
                {transactionIcon}
              </span>
              <p className="text-gray-600">{transaction.title}</p>
              <p className="text-gray-800 ml-auto text-2xl">
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
          <div className="mx-auto py-1 border border-gray-400 px-2 flex items-center relative w-fit rounded-full before:absolute before:-translate-x-full before:w-full after:w-full before:bg-gray-400 after:bg-gray-400 before:h-[1px] after:h-[1px] after:absolute after:translate-x-full">
            {transaction.date.toDateString()}
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
