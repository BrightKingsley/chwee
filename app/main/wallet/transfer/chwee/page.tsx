"use client";

import {
  AnimateInOut,
  Header,
  ListTile,
  Overlay,
  UserListModal,
} from "@/app/components/client";
import { Button, IconButton, Spinner } from "@/app/components/mui";
import { BASE_URL, WALLET } from "@/constants/routes";
import { NotificationContext, TransactionContext } from "@/context";
import { ClientUser } from "@/types/models";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import { NumberPad, Input } from "../../components";
import { Input as MInput } from "@/app/components/mui";

import { useLongPress } from "@/hooks";
import DeleteBackLineIcon from "remixicon-react/DeleteBackLineIcon";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  formatTag,
  formatToNumberWithDecimal,
  lettersAndNumbersOnly,
} from "@/lib/utils";
import Link from "next/link";

export default function TranferToChwee() {
  const { triggerNotification } = useContext(NotificationContext);
  const { transferToChwee } = useContext(TransactionContext);

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const swiper = useSwiper();
  const sliderRef = useRef<any>(null);

  const handleNext = () => {
    if (currentSlide < 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    sliderRef.current.swiper.slideTo(currentSlide, 500, false);
  }, [currentSlide]);

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
    if (!receiverTag) return triggerNotification("Invalid User tag");
    setValues((prev) => ({ ...prev, receiverTag }));
    return handleNext();
  };

  const handleAmountSubmit = async (
    e: React.SyntheticEvent,
    amount: number
  ) => {
    e.preventDefault();
    if (!amount) return triggerNotification("Invalid amount");
    setValues((prev) => ({ ...prev, amount }));

    return handleNext();
  };
  const handlePinSubmit = (e: React.SyntheticEvent, pin: number) => {
    e.preventDefault();

    setValues((prev) => ({ ...prev, transferPin: pin }));

    transferToChwee({ finishTransaction, startTransaction, values });
  };

  function startTransaction(amount: number) {
    setShowEntries((prev) => ({ ...prev, loading: true }));
    if (amount < 100) {
      setShowEntries((prev) => ({ ...prev, loading: false }));
      return triggerNotification("invalid amount");
    }
  }

  function finishTransaction(result: any) {
    const resultMesssge = (result.message || result.error.message) as string;

    const displayMessage = resultMesssge
      .toLocaleLowerCase()
      .includes("insufficient") ? (
      <Link href={`${WALLET}/add-money`}>{resultMesssge} click to fund</Link>
    ) : (
      resultMesssge
    );

    triggerNotification(displayMessage);

    console.log({ result });

    setShowEntries((prev) => ({ ...prev, loading: false }));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <Header imgShown={false} title="Transfer" />
      </div>
      <div className="flex flex-1 w-full h-full shrink-0 bg-primary/10">
        {showEntries.loading && (
          <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen overflow-y-auto backdrop-blur-sm">
            <Spinner />
          </div>
        )}
        <Swiper
          allowTouchMove={currentSlide < 2 ? false : true}
          ref={sliderRef}
        >
          <SwiperSlide>
            <div className="relative w-full h-full pt-16 rounded-md">
              <TagInput handleSubmit={handleTagSubmit} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full pt-16 rounded-md">
              <AmountInput
                handleCancel={handlePrevious}
                handleSubmit={handleAmountSubmit}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full pt-16 rounded-md">
              <PinInput
                show={showEntries.pin}
                setShow={setShowEntries}
                handleCancel={handlePrevious}
                handleSubmit={handlePinSubmit}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

function TagInput({ handleSubmit }: { handleSubmit: Function }) {
  const [receiverTagInput, setTagInput] = useState<string>("");
  const [connectionsModal, setConnectionsModal] = useState<{
    loading: boolean;
    show: boolean;
    connections: ClientUser[];
  }>({
    loading: false,
    show: false,
    connections: [],
  });

  const handleShowModal = () => {
    setConnectionsModal((prev) => ({ ...prev, show: false }));
  };
  const handleItemClicked = (tag: string) => {
    setTagInput(tag);
  };

  useEffect(() => {
    (async () => {
      try {
        setConnectionsModal((prev) => ({ ...prev, loading: true, show: true }));
        const res = await fetch(`${BASE_URL}/api/connections`);
        const data = await res.json();
        console.log({ data });
        const connections = data as ClientUser[] | null;
        if (!connections) return;
        setConnectionsModal((prev) => ({
          ...prev,
          loading: false,
          connections,
        }));
      } catch (error) {
        console.error({ error });
        setConnectionsModal((prev) => ({ ...prev, loading: false }));
      }
    })();
  }, []);

  return (
    <div className="relative w-full h-full">
      <form
        onSubmit={(e) => handleSubmit(e, receiverTagInput)}
        className="px-4 space-y-3 "
      >
        {/* <label htmlFor="receiverTag">input {"recipient's"} Tag</label> */}
        <Input
          label="user tag"
          icon={<p className="font-bold">@</p>}
          value={receiverTagInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTagInput(lettersAndNumbersOnly(e.target.value))
          }
          type="text"
          name="receiverTag"
          // placeholder="@johnDoe"
        />
        {/* <div className="ml-auto w-fit"> */}
        <Button fullWidth type="submit" className="">
          confirm
        </Button>
        {/* </div> */}
      </form>
      <UserListModal
        loading={connectionsModal.loading}
        show={connectionsModal.show}
        userList={connectionsModal.connections}
        handleShowModal={handleShowModal}
        handleItemClicked={handleItemClicked}
      />
      <AnimateInOut
        show={!connectionsModal.show}
        init={{ scale: 0, translateY: 100 }}
        out={{ scale: 0, translateY: 100 }}
        animate={{ scale: 1, translateY: 0 }}
        className="absolute flex justify-center w-full bottom-5"
      >
        <IconButton
          variant="filled"
          onClick={() =>
            setConnectionsModal((prev) => ({ ...prev, show: true }))
          }
          color="white"
          className="rounded-full mx-auto text-primary !p-4 w-24 h-24"
        >
          <ChevronUpIcon className="w-16 h-16 p-3" />
        </IconButton>
      </AnimateInOut>
    </div>
  );
}

const amounts = [100, 200, 500, 1000, 2000, 10000];
function AmountInput({
  handleSubmit,
  handleCancel,
}: {
  handleSubmit: Function;
  handleCancel: Function;
}) {
  const [amountInput, setAmountInput] = useState("0");
  const [showAmountModal, setShowAmountModal] = useState(false);
  // const [value, setValue] = useState("0");
  const [loading, setLoading] = useState(false);

  return (
    // <div className="relative w-full h-full">
    <>
      <form
        onSubmit={(e) => handleSubmit(e, amountInput)}
        className="px-4 space-y-3 "
      >
        {/* <label htmlFor="amount">enter amount in naira</label> */}
        <Input
          label="amount"
          icon={<p className="font-bold">₦</p>}
          onFocus={(e) => {
            e.preventDefault();
            setShowAmountModal(true);
          }}
          value={amountInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmountInput(parseFloat(e.target.value).toString())
          }
          type="number"
          maxLength={4}
          name="amount"
          placeholder="10,000"
        />
        <div className="flex items-center w-full gap-2">
          <Button
            variant="outlined"
            onClick={() => {
              handleCancel();
              setAmountInput("");
            }}
            fullWidth
            type="reset"
            className=""
          >
            cancel
          </Button>
          <Button fullWidth type="submit" className="">
            confirm
          </Button>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-3 px-4 py-8">
        {amounts.map((amount) => (
          <Button
            variant="outlined"
            key={amount}
            onClick={() => {
              !(amountInput === "0" && amount === 0) &&
                setAmountInput(amount.toString());
            }}
            className="p-1 text-lg border rounded-xl"
          >
            {amount}
          </Button>
        ))}
      </div>
      <NumberPad
        showAmountModal={showAmountModal}
        valueInput={amountInput}
        setValueInput={setAmountInput}
      />
      {/* </div> */}
    </>
  );
}

function PinInput({
  handleSubmit,
  handleCancel,
  show,
  setShow,
}: {
  handleSubmit: Function;
  handleCancel: Function;
  show: boolean;
  setShow: React.Dispatch<
    React.SetStateAction<{
      receiverTag: boolean;
      amount: boolean;
      pin: boolean;
      loading: boolean;
    }>
  >;
}) {
  const [pinInput, setPinInput] = useState("");

  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit(e, parseInt(formatToNumberWithDecimal(pinInput)))
        }
        className="px-4 space-y-3 "
      >
        <label htmlFor="pin"></label>
        <Input
          // label="transfer pin"
          value={pinInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // setPinInput(parseFloat(e.target.value))
            setPinInput(e.target.value)
          }
          placeholder="1234"
          type="password"
          maxLength={4}
          name="pin"
          className="!text-center"
        />
        <div className="flex space-x-2">
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              // setShow((prev) => ({ ...prev, pin: false, amount: true }))
              handleCancel();
              setPinInput("");
            }}
          >
            cancel
          </Button>
          <Button fullWidth type="submit" onClick={() => {}}>
            confirm
          </Button>
        </div>
      </form>
      <NumberPad
        showAmountModal={true}
        valueInput={pinInput}
        setValueInput={setPinInput}
      />
    </>
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
      className="absolute top-[40%]_ bottom-0 flex flex-col left-0 space-y-2 bg-body rounded-t-3xl h-[60%] overflow-y-auto mx-auto w-full"
    >
      <div className="w-1/3 h-1 mx-auto my-3 bg-gray-300 rounded-full" />
      <div className="grid flex-1 grid-cols-3 grid-rows-4 gap-4 px-2 pb-2 shrink-0">
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
        placeholder={placeholder}
      />
    </div>
  );
}
