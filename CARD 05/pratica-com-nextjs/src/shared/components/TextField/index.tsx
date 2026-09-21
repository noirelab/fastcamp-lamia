import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const TextField = ({ id, label, ...props }: TextFieldProps) => {
  return (
    <label htmlFor={id} className="grid gap-1 text-sm font-semibold text-gray-700">
      {label}
      <input
        id={id}
        {...props}
        className="min-h-10 rounded border border-gray-300 bg-white px-3 text-base font-normal text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </label>
  );
};
