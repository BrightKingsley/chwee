"use client";
import { IconButton } from "@/app/components/mui";
import {
  ModalContext,
  NotificationContext,
  TransactionContext,
} from "@/context";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import ExchangeDollarLineIcon from "remixicon-react/ExchangeDollarLineIcon";

export default function TransferButton({
  className,
  variant = "filled",
  receiverTag,
}: {
  className: string;
  variant?: "filled" | "outlined" | "gradient" | "text";
  receiverTag: string;
}) {
  const { triggerModal } = useContext(ModalContext);
  const { triggerNotification } = useContext(NotificationContext);
  const { triggerTransactionForm, transferToChwee } =
    useContext(TransactionContext);

  const [loading, setLoading] = useState(false);

  function startTransaction(amount: number) {
    setLoading(true);
    if (amount < 100) {
      setLoading(false);
      return triggerNotification("invalid amount");
    }
  }

  function finishTransaction(result: any) {
    triggerNotification(result.message || result.error.message);

    console.log({ result });

    setLoading(false);
  }

  //   transferToChwee();

  const handleClick = () => {
    triggerTransactionForm({
      cancel: triggerTransactionForm,
      confirm: (amount) => {
        triggerModal({
          cancel: triggerModal,
          show: true,
          message: (
            <p>
              Transfer N{amount}.00 to{" "}
              <span className="text-primary font-bold">{receiverTag}?</span>
            </p>
          ),
          confirm: () => {
            transferToChwee({
              finishTransaction,
              startTransaction,
              values: {
                accountType: "chwee",
                amount,
                receiverTag,
                transferPin: 1234, // TODO: This is default pin
              },
            });
          },
        });
      },
      show: true,
      type: "send",
    });
  };

  return (
    <IconButton
      onClick={() => handleClick()}
      variant={variant}
      className={className}
    >
      {/* <CurrencyDollarIcon className="w-8 h-8" /> */}
      <ExchangeDollarLineIcon className="w-8 h-8" />
    </IconButton>
  );
}
