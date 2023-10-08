import { getTransactionByID } from "@/lib/db";

export default async function Transaction({
  params,
}: {
  params: { transactionID: string };
}) {
  const transaction = await getTransactionByID({
    transactionID: params.transactionID,
  });

  if (!transaction) return <h1>Transaction doesnt exist</h1>;

  return (
    <div>
      <div>{transaction.status}</div>
      <div>{transaction.date.toLocaleDateString()}</div>
      <div>{transaction.amount}</div>
      <div>{transaction.title}</div>
      <div>{transaction.type}</div>
      <div>{transaction.sender.toString()}</div>
    </div>
  );
}
