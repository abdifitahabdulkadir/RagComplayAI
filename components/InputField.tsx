import Link from "next/link";
import { ChangeEvent, RefObject } from "react";

interface Props {
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  disable?: boolean;
  showForgetPassword?: boolean;
  ref?: RefObject<HTMLInputElement | null>;
}
export default function InputField({
  showForgetPassword = false,
  placeholder,
  type,
  onChange,
  ref,
  disable,
  value,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      {showForgetPassword && (
        <Link
          href={"/auth/forget-password"}
          className="text-indigo-700  hover:text-sky-600 transition-colors duration-300 self-end will-change-[color]"
        >
          Forget Password
        </Link>
      )}
      <input
        ref={ref}
        disabled={disable}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-full disabled:bg-gray-300 disabled:text-black/70 border border-black/10 focus:outline-indigo-700 rounded-[10px] px-3 py-4"
        required
      />
    </div>
  );
}
