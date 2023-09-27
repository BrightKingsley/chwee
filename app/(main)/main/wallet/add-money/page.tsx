"use client";

import { Button, Header } from "@/components";
import { BASE_URL, WALLET } from "@/constants/routes";
import { NotificationContext } from "@/context";
import { useLongPress } from "@/hooks";
import { BackspaceIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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

      return result.message === "success" && push(WALLET);

      console.log();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="font-druk-wide-bold w-full h-full flex flex-col">
      <Header title="Add Money" />
      <div className="px-1 flex-[1] flex items-center justify-center">
        <div
          className="w-full p-3 text-3xl text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary overflow-auto"
          // type="number"
          // name=""
          id=""
          inputMode="decimal"
        >
          <small>₦</small>
          {parseInt(value).toFixed(2)}
        </div>
        {/* <input
          value={parseInt(value).toFixed(2)}
          className="w-full p-3 text-3xl text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary overflow-auto"
          type="number"
          // name=""
          id=""
          inputMode="decimal"
        /> */}
      </div>
      <div className="h-full flex-[2] px-1 space-y-2 flex flex-col">
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
          <button className="p-2 rounded-md border">.</button>
          {/* @ts-ignore */}
          <button
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
        </div>
        <Button
          loading={loading}
          onClick={handleAddMoney}
          className="p-2 h-16 w-full !rounded-lg border flex items-center justify-center font-druk-wide-bold"
        >
          add money
        </Button>
      </div>
    </div>
  );
}
