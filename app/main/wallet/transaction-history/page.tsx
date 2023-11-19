import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Header, ListTile } from "@/app/components/client";
import { getWallet } from "@/lib/db";
import { ClientWallet } from "@/types/models";
import { getServerSession } from "next-auth";
import { TransactionTile } from "../components";

export default async function TransactionHistory() {
  const serverSession = await getServerSession(authOptions);

  if (!serverSession || !serverSession?.user || !serverSession?.user.id)
    return <h1>No User</h1>;
  const data = await getWallet({ ownerID: serverSession?.user.id });

  const walletData = data as ClientWallet | null;

  if (!walletData)
    return (
      <div className="flex text-primary text-2xl font-bold h-full w-full item-center justify-center">
        <p>{"Couldn't"} get transaction data</p>
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="shrink-0">
        <Header title="Transaction History" />
      </div>
      <div className="space-y-2 flex-1 px-2 h-full w-full overflow-auto shrink-0 overflow-y-auto py-1">
        {walletData.transactions.reverse().map((transaction, i) => (
          <TransactionTile key={i} transactionID={transaction.toString()} />
        ))}
      </div>
    </div>
  );
}
