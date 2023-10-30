"use client";

import React, { createContext, useState } from "react";
import { TransactionContextType, triggerTransactionFormType } from "../types";
import { BASE_URL } from "@/constants/routes";

const TransactionContext = createContext<TransactionContextType>({
  triggerTransactionForm: () => {},
  transactionFormState: {
    showTransaction: false,
    transactionMessage: "",
    actionConfirm: () => {},
    actionCancel: () => {},
    disableOnClick: false,
    type: "send",
  },
  transferToChwee: async () => {},
});

export const TransactionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactionFormState, setTransactionFormState] = useState<{
    showTransaction: boolean;
    actionConfirm: TransactionContextType["transactionFormState"]["actionConfirm"];
    actionCancel: Function;
    transactionMessage: string | React.ReactNode;
    disableOnClick: boolean;
    type: "request" | "send";
  }>({
    showTransaction: false,
    actionConfirm: () => {},
    actionCancel: () => {},
    transactionMessage: "",
    disableOnClick: false,
    type: "send",
  });

  const triggerTransactionForm = (
    {
      message,
      confirm,
      cancel,
      clickToDisable,
      show,
      type,
    }: triggerTransactionFormType = {
      message: "",
      confirm: () => {},
      cancel: () => {},
      clickToDisable: false,
      show: false,
      type: "send",
    }
  ) => {
    console.log("Form TriGggered");

    type && setTransactionFormState((prev) => ({ ...prev, type }));
    show !== undefined
      ? setTransactionFormState((prev) => ({ ...prev, showTransaction: show }))
      : transactionFormState.showTransaction
      ? setTransactionFormState((prev) => ({ ...prev, showTransaction: false }))
      : setTransactionFormState((prev) => ({ ...prev, showTransaction: true }));
    // showTransaction = showTransaction ? false : true;
    message &&
      setTransactionFormState((prev) => ({
        ...prev,
        transactionMessage: message,
      }));
    confirm &&
      typeof confirm === "function" &&
      setTransactionFormState((prev) => ({ ...prev, actionConfirm: confirm }));
    cancel &&
      typeof cancel === "function" &&
      setTransactionFormState((prev) => ({ ...prev, actionCancel: cancel }));
    typeof clickToDisable === "boolean" &&
      setTransactionFormState((prev) => ({
        ...prev,
        disableOnClick: clickToDisable,
      }));
  };

  async function transferToChwee({
    finishTransaction,
    startTransaction,
    values,
  }: {
    startTransaction: (amount: number) => void;
    finishTransaction: Function;
    values: {
      receiverTag: string;
      amount: number;
      transferPin: number;
      accountType: "chwee";
    };
  }) {
    try {
      startTransaction(values.amount);

      const res = await fetch(`${BASE_URL}/api/transactions/transfer`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const result = await res.json();
      finishTransaction(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        triggerTransactionForm,
        transactionFormState,
        transferToChwee,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
