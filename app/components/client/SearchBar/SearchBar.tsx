"use client";

import { IconButton } from "@/app/components/mui";
import SearchLineIcon from "remixicon-react/SearchLineIcon";
import { useEffect, useReducer, useState } from "react";
import { BASE_URL } from "@/constants/routes";

export default function SearchBar({
  collection,
  disabled = false,
  placeholder = "search",
  onFocus,
  onBlur,
  getSearchResults,
}: {
  collection: "users" | "groups" | "events";
  disabled?: boolean;
  placeholder?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  getSearchResults?: any;
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!query || !getSearchResults || query.length === 0 || query.length < 3)
      return;
    const timeout = setTimeout(async () => {
      const response = await fetch(
        `${BASE_URL}/api/search/${collection}?q=${query}`
      );
      const suggestion = await response.json();
      if (!suggestion) return getSearchResults([]);
      getSearchResults(suggestion);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="relative flex items-center gap-2 mx-2 mt-4"
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
        onChange={(e) => setQuery(e.target.value)}
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
        <SearchLineIcon className="w-6 h-6 text-white" />
      </IconButton>
    </form>
  );
}
