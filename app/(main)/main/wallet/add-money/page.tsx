"use client";

import { Header } from "@/app/components/client";
import { BASE_URL, WALLET } from "@/constants/routes";
import { NotificationContext } from "@/context";
import { useLongPress } from "@/hooks";
import { BackspaceIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AnimateInOut } from "@/app/components/client";
import DeleteBackLineIcon from "remixicon-react/DeleteBackLineIcon";
import { Button, Spinner, Input as MInput } from "@/app/components/mui";

export default function AddMoney() {
  const { triggerNotification } = useContext(NotificationContext);

  const [value, setValue] = useState("0");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const gestures = useLongPress({
    callback: () => setValue("0"),
    duration: 800,
  });

  const handleAddMoney = async () => {
    try {
      setLoading(true);
      if (value === "0") {
        setLoading(false);
        return triggerNotification("invalid amount");
      }
      console.log("ADDING_MONEY");

      const res = await fetch(`${BASE_URL}/api/transactions/deposit`, {
        method: "POST",
        body: JSON.stringify({
          action: "fund",
          amount: parseFloat(parseInt(value).toFixed(2).toString()),
        }),
      });

      const result = await res.json();
      triggerNotification(result.message || result.error.message);
      // result.message === "success"
      //   ? triggerNotification("Funded wallet successfully")
      //   : triggerNotification("An error ocurred! Couldn't fund wallet");

      console.log(result);

      setValue("0");
      setLoading(false);

      console.log({ result });
      return result.message === "success" && push(WALLET);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="font-druk-wide-bold_ w-full h-full flex flex-col">
      <Header title="Add Money" />
      <div className="space-y-3 px-4 mt-16 flex-[1] flex_ items-center_ justify-center_">
        {/* <div
          className="w-full p-3 text-3xl text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary overflow-auto"
          // type="number"
          // name=""
          id=""
          inputMode="decimal"
        >
          <small>₦</small>
          {parseInt(value).toFixed(2)}
        </div> */}
        <Input
          label="amount"
          icon={<p className="font-bold">@</p>}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          type="number"
          maxLength={4}
          name="receiverTag"
          placeholder="@johnDoe"
        />
        <Button
          disabled={loading}
          onClick={handleAddMoney}
          className="p-2 h-16 w-full !rounded-lg border flex items-center justify-center font-druk-wide-bold_"
        >
          {loading ? <Spinner /> : "add money"}
        </Button>
        {/* <input
          value={parseInt(value).toFixed(2)}
          className="w-full p-3 text-3xl text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary overflow-auto"
          type="number"
          // name=""
          id=""
          inputMode="decimal"
        /> */}
      </div>

      <NumberPad
        setValueInput={setValue}
        showAmountModal={true}
        valueInput={value}
      />
      {/* <div className="h-full flex-[2] px-1 space-y-2 flex flex-col">
        <div className="grid grid-cols-3 gap-2 h-full">
          {numbers.map((number) => (
            <button
              key={number}
              onClick={() => {
                !(value === "0" && number === 0) &&
                  setValue((prev) => {
                    return value !== "0" ? (prev += number) : number.toString();
                  });
              }}
              className="p-2 rounded-lg border"
            >
              {number}
            </button>
          ))}
          <button className="p-2 rounded-md border">.</button> */}
      {/* @ts-ignore */}
      {/* <button
            {...gestures}
            onClick={() => {
              if (value !== "0") {
                console.log("DELETE ALL");

                setValue((prev) =>
                  prev !== "0"
                    ? prev.replace(prev.charAt(prev.length - 1), "")
                    : "0"
                );
              }
            }}
            className="p-2 rounded-md border flex items-center justify-center"
          >
            <BackspaceIcon className="w-8 h-8" />
          </button>
        </div> */}

      {/* </div> */}
    </div>
  );
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function NumberPad({
  showAmountModal,
  valueInput,
  setValueInput,
}: {
  showAmountModal: boolean;
  valueInput: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const gestures = useLongPress({
    callback: () => setValueInput("0"),
    duration: 800,
  });

  return (
    <AnimateInOut
      init={{ translateY: "100%" }}
      out={{ translateY: "100%" }}
      show={showAmountModal}
      animate={{ translateY: 0 }}
      transition={{ type: "keyframes" }}
      className="fixed top-[40%] flex flex-col left-0 space-y-2 bg-body rounded-t-3xl h-[60%] overflow-y-auto mx-auto w-full"
    >
      <div className="bg-gray-300 rounded-full w-1/3 h-1 mx-auto my-3" />
      <div className="grid gap-4 px-2 pb-2 grid-cols-3 grid-rows-4 flex-1 shrink-0">
        {numbers.map((number) => (
          <Button
            variant="text"
            key={number}
            onClick={() => {
              !(valueInput === "0" && number === 0) &&
                setValueInput((prev) => {
                  return valueInput !== "0"
                    ? (prev += number)
                    : number.toString();
                });
            }}
            className="p-2 aspect-video_ aspect-[4/2]_ row-span-1 text-3xl rounded-2xl border"
          >
            {number}
          </Button>
        ))}
        <Button
          variant="text"
          className="p-2 rounded-2xl border aspect-video_ aspect-[4/2]_ row-span-1 text-3xl"
        >
          .
        </Button>
        {/* @ts-ignore */}
        <Button
          variant="text"
          {...gestures}
          onClick={() => {
            if (valueInput !== "0") {
              console.log("DELETE ALL");

              setValueInput((prev) =>
                prev !== "0"
                  ? prev.replace(prev.charAt(prev.length - 1), "")
                  : "0"
              );
            }
          }}
          className="p-2 aspect-video_ aspect-[4/2]_ row-span-1 text-3xl rounded-2xl border flex items-center justify-center"
        >
          <DeleteBackLineIcon className="w-8 h-8" />
        </Button>
      </div>
    </AnimateInOut>
  );
}

function Input({
  className,
  type,
  placeholder,
  onChange,
  icon,
  value,
  label,
  onFocus,
  maxLength,
}: {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  label?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <MInput
        // required
        icon={icon}
        label={label}
        value={value}
        onChange={(e) => onChange(e)}
        className="w-full !p-3 !py-4 !text-lg text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary"
        onFocus={(e) => (onFocus ? onFocus(e) : null)}
        type={type}
        maxLength={maxLength}
        // placeholder={placeholder}
      />
    </div>
  );
}
