"use client";

import { Input as MInput } from "@/components/mui";

export default function Input({
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
