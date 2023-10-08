"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@/components/mui";

import Search from "@mui/icons-material/Search";
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

export default function SearchBar({
  collection,
  disabled = false,
  placeholder = "search",
}: {
  collection: string;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [state, dispatch] = useReducer(myreducer, initialState);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex gap-2 items-center mx-2 mt-4"
    >
      <input
        disabled={disabled}
        // value={message.textContent}
        // cols={5}
        // onChange={(e) => {}}
        className={`relative w-full p-2 bg-white/60 text-gray-700 border-none rounded-xl outline-none focus:bg-white outline-primary ${
          disabled &&
          "cursor-not-allowed bg-gray-200 outline-red-400 outline-dashed"
        }`}
        placeholder={placeholder}
      />
      <IconButton
        type="submit"
        disabled={disabled}
        className="rounded-xl p-2 bg-primary"
      >
        <Search className="w-8 h-8 text-white" />
      </IconButton>
    </form>
  );
}
