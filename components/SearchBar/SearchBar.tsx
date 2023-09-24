"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBar({
  colection,
  disabled = false,
  placeholder = "search",
}: {
  colection: string;
  disabled?: boolean;
  placeholder?: string;
}) {
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
        className={`relative w-full p-1 bg-white/60 text-gray-700 border-none rounded-xl outline-none focus:bg-white outline-primary ${
          disabled &&
          "cursor-not-allowed bg-gray-200 outline-red-400 outline-dashed"
        }`}
        placeholder={placeholder}
      />
      <button disabled={disabled} className="rounded-full p-1 bg-primary">
        <MagnifyingGlassIcon className="w-6 h-6 text-white" />
      </button>
    </form>
  );
}
