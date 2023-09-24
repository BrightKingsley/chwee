"use client";
import { AnimateInOut, Button, Header, Spinner } from "@/components";
import { BASE_URL } from "@/constants/routes";
import { NotificationContext } from "@/context";
import { useContext, useState } from "react";
import { useSwiper } from "swiper/react";

export default function TranferToChwee() {
  const { triggerNotification } = useContext(NotificationContext);

  const [showEntries, setShowEntries] = useState<{
    receiverTag: boolean;
    amount: boolean;
    pin: boolean;
    loading: boolean;
  }>({
    amount: false,
    pin: false,
    receiverTag: true,
    loading: false,
  });

  // @Bright16952225372230.36
  // mikeog7dX6
  const [values, setValues] = useState<{
    receiverTag: string;
    amount: number;
    transferPin: number;
    accountType: "chwee";
  }>({
    accountType: "chwee",
    amount: 0,
    transferPin: 0,
    receiverTag: "",
  });

  const handleTagSubmit = (e: React.SyntheticEvent, receiverTag: string) => {
    e.preventDefault();
    setValues((prev) => ({ ...prev, receiverTag }));

    setShowEntries((prev) => ({ ...prev, amount: true, receiverTag: false }));
  };

  const handleAmountSubmit = async (
    e: React.SyntheticEvent,
    amount: number
  ) => {
    e.preventDefault();

    setValues((prev) => ({ ...prev, amount }));

    setShowEntries((prev) => ({ ...prev, pin: true }));
  };
  const handlePinSubmit = (e: React.SyntheticEvent, pin: number) => {
    e.preventDefault();

    setValues((prev) => ({ ...prev, transferPin: pin }));

    // setShowEntries((prev) => ({ ...prev, amount: true }));

    transfer();
  };

  async function transfer() {
    try {
      setShowEntries((prev) => ({ ...prev, loading: true }));

      if (values.amount < 100) {
        setShowEntries((prev) => ({ ...prev, loading: false }));
        return triggerNotification("invalid amount");
      }

      const res = await fetch(`${BASE_URL}/api/transactions/transfer`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const result = await res.json();
      triggerNotification(result.message || result.error.message);

      console.log({ result });

      // setValues((prev) => ({
      //   ...prev,
      //   amount: 0,
      //   receiverTag: "",
      //   transferPin: 0,
      // }));
      setShowEntries((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header imgShown={false} title="Transfer" />
      <div className="flex w-full h-full ">
        {showEntries.loading && (
          <div className="fixed z-40 w-screen h-screen bg-white top-0 left-0">
            <Spinner />
          </div>
        )}
        <AnimateInOut
          init={{
            opacity: 0,
            translateX: 100,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
          }}
          out={{
            opacity: 0,
            translateX: -100,
          }}
          show={showEntries.receiverTag}
          className="bg-white rounded-md"
        >
          <TagInput handleSubmit={handleTagSubmit} />
        </AnimateInOut>
        <AnimateInOut
          init={{
            opacity: 0,
            translateX: 100,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
          }}
          out={{
            opacity: 0,
            translateX: -100,
          }}
          show={showEntries.amount}
          className="bg-white rounded-md"
          transition={{ delay: 0.5 }}
        >
          <AmountInput handleSubmit={handleAmountSubmit} />
        </AnimateInOut>
        <AnimateInOut
          init={{
            opacity: 0,
            translateY: 100,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          out={{
            opacity: 0,
            translateY: 100,
          }}
          show={showEntries.pin}
          className="absolute top-40 rounded-lg mx-10 h-52 bg-white p-4"
        >
          <PinInput handleSubmit={handlePinSubmit} />
        </AnimateInOut>
      </div>
    </>
  );
}

function TagInput({ handleSubmit }: { handleSubmit: Function }) {
  const [receiverTagInput, setTagInput] = useState<string>("");

  return (
    <form onSubmit={(e) => handleSubmit(e, receiverTagInput)}>
      <label htmlFor="receiverTag">input recipient's receiverTag</label>
      <Input
        value={receiverTagInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTagInput(e.target.value)
        }
        type="text"
        maxLength={4}
        name="receiverTag"
        placeholder="@johnDoe"
      />
      <Button onClick={() => {}}>confirm</Button>
    </form>
  );
}

function AmountInput({ handleSubmit }: { handleSubmit: Function }) {
  const [amountInput, setAmountInput] = useState<number>(0);

  return (
    <form onSubmit={(e) => handleSubmit(e, amountInput)}>
      <label htmlFor="amount">enter amount in naira</label>
      <Input
        value={amountInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmountInput(parseFloat(e.target.value))
        }
        type="number"
        maxLength={4}
        name="amount"
        placeholder="10,000"
      />
      <Button onClick={() => {}}>confirm</Button>
    </form>
  );
}

function PinInput({ handleSubmit }: { handleSubmit: Function }) {
  const [pinInput, setPinInput] = useState<number>(1234);

  return (
    <form onSubmit={(e) => handleSubmit(e, pinInput)}>
      <label htmlFor="pin"></label>
      <Input
        value={pinInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPinInput(parseFloat(e.target.value))
        }
        type="number"
        maxLength={4}
        name="pin"
        placeholder="1234"
      />
      <Button onClick={() => {}}>confirm</Button>
    </form>
  );
}

const Input = ({
  type,
  placeholder,
  onChange,
  value,
}: {
  type: "text" | "number";
  placeholder: string;
  value?: string | number;
  onChange: Function;
  name?: string;
  maxLength?: number;
}) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e)}
      className="w-full p-3 text-3xl text-gray-700 border rounded-md outline-none resize-none bg-primary/20 border-primary_ focus:outline-primary"
      type={type}
      placeholder={placeholder}
    />
  );
};
