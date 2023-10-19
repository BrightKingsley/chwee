"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@/app/components/mui";

import SearchLineIcon from "remixicon-react/SearchLineIcon";
import { useReducer } from "react";

const initialState: ReducerState = {
  me: "Kvng",
  you: "Babe",
  us: "married",
};

type ReducerState = {
  me: string;
  you: string;
  us: string;
};

const myreducer = (state: ReducerState, action: string): ReducerState => {
  console.log(action);
  return {
    me: "",
    us: "",
    you: "",
  };
};

export default function SearchLineIconBar({
  collection,
  disabled = false,
  placeholder = "search",
  onFocus,
  onBlur,
}: {
  collection: string;
  disabled?: boolean;
  placeholder?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}) {
  const [state, dispatch] = useReducer(myreducer, initialState);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex items-center gap-2 mx-2 mt-4"
    >
      <input
        disabled={disabled}
        // value={message.textContent}
        // cols={5}
        // onChange={(e) => {}}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`relative w-full p-1 bg-white/60 text-gray-700 border-none rounded-xl outline-none focus:bg-white outline-primary ${
          disabled &&
          "cursor-not-allowed bg-gray-200 outline-red-400 outline-dashed"
        }`}
        placeholder={placeholder}
      />
      <IconButton
        variant="filled"
        title="search"
        aria-label="search"
        type="submit"
        disabled={disabled}
        className="p-2 rounded-xl shrink-0"
      >
        <SearchLineIcon className="w-8 h-8 text-white" />
      </IconButton>
    </form>
  );
}