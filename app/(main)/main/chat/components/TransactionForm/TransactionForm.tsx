"use client";

import { AnimateInOut } from "@/app/components/client";
import { Button } from "@/app/components/mui";
import { Overlay } from "@/app/components/client";
import { ChatContext } from "@/context";
import { formatToNumberWithDecimal } from "@/lib/utils";
import { MessageBody } from "@/types/models";
import { Input } from "@material-tailwind/react";
import { useContext, useState } from "react";

export default function TransactionForm() {
  const { setToggleTransactionForm, toggleTransactionForm, setMessage } =
    useContext(ChatContext);

  const [amount, setAmount] = useState(0.0);
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessage((prev) => ({
      ...prev,
      textContent:
        toggleTransactionForm.type === "request"
          ? `Please, I need ₦${amount}`
          : `I'll send you ₦${amount}`,
      transaction: {
        ...prev.transaction,
        type: toggleTransactionForm.type,
        amount,
      },
      type: "fund",
    }));
  };

  const handleCancel = () => {
    setToggleTransactionForm((prev) => ({ ...prev, show: false }));
    setAmount(0.0);
    setInput("");
  };

  return (
    <>
      <Overlay
        handleShowOverlay={handleCancel}
        show={toggleTransactionForm.show}
        disableOnClick
      />
      <AnimateInOut
        init={{ opacity: 0, translateY: -80, scale: 0 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        out={{ opacity: 0, translateY: -80, scale: 0 }}
        show={toggleTransactionForm.show}
        className="fixed p-4 top-[50%] bg-white rounded-xl inset-0 mx-auto md:mx-16 text-center w-10/12 z-40 h-fit"
      >
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            handleSubmit(e);
            setAmount(0.0);
            setToggleTransactionForm((prev) => ({ ...prev, show: false }));
          }}
          className="space-y-2 w-full relative"
        >
          <p>
            Enter the amount You wish to{" "}
            <span
              className={`font-bold ${
                toggleTransactionForm.type === "request"
                  ? "text-green-400"
                  : "text-brand-darkblue"
              }`}
            >
              {toggleTransactionForm.type === "request" ? "receive" : "send"}
            </span>
          </p>
          <input
            value={input}
            placeholder="₦0.00"
            // prefix="₦"
            type="text"
            onChange={(e) => {
              setAmount(+formatToNumberWithDecimal(e.target.value));
              setInput(`₦${formatToNumberWithDecimal(e.target.value)}`);
            }}
            className="w-full mx-auto text-center p-3 !text-3xl text-gray-700 !font-druk-wide-bold !border-none !outline-none focus:!outline-none focus:!border-none focus:before:!hidden focus:after:!hidden "
          />
          <div className="flex justify-around w-full gap-3">
            <Button
              fullWidth
              type="reset"
              variant="outlined"
              onClick={() => handleCancel()}
            >
              cancel
            </Button>
            <Button fullWidth type="submit" variant="filled">
              confirm
            </Button>
          </div>
        </form>
      </AnimateInOut>
    </>
  );
}
