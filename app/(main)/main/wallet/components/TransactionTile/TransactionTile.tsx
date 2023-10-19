import { WALLET } from "@/constants/routes";
import { getTransactionByID } from "@/lib/db";
import Link from "next/link";
import ArrowUpLineIcon from "remixicon-react/ArrowUpLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import ArrowDownLineIcon from "remixicon-react/ArrowDownLineIcon";
import { use } from "react";

const getTransaction = async (transactionID: string) => {
  return await getTransactionByID({ transactionID });
};

export default function TransactionTile({
  transactionID,
}: {
  transactionID: string;
}) {
  const transaction = use(getTransaction(transactionID));

  console.log({ transaction });

  if (!transaction) return <p>{"couldn't"} get data</p>;

  return (
    <Link
      href={`${WALLET}/transaction-history/${transactionID}`}
      className="flex items-center w-full py-2 px-1"
    >
      <div
        className={`${
          transaction.type === "deposit"
            ? "bg-primary/10 text-primary"
            : transaction.type === "withdrawal"
            ? "bg-brand-darkblue/10 text-brand-darkblue"
            : "bg-brand-yellow/10 text-brand-yellow"
        } rounded-full p-2`}
      >
        {transaction.type === "deposit" ? (
          <ArrowDownLineIcon className="w-6 h-6" />
        ) : transaction.type === "withdrawal" ? (
          <ArrowUpLineIcon className="w-6 h-6" />
        ) : (
          <ArrowRightLineIcon className="w-6 h-6" />
        )}
      </div>
      <div className="ml-3">
        <small className="text-gray-800 block font-bold">
          {transaction.title}
        </small>
        <small className="text-gray-600">
          {transaction.date.toDateString()}
        </small>
      </div>
      <div className="ml-auto text-end">
        <small className="font-bold block text-gray-800">
          ₦{transaction.amount}
        </small>
        <small
          className={`${
            transaction.status === "successful"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {transaction.status}
        </small>
      </div>
    </Link>
  );
}
