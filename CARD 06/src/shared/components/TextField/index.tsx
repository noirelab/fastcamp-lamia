import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export const TextField = ({
  id,
  label,
  error,
  className = "",
  ...props
}: TextFieldProps) => {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`min-h-10 rounded border border-gray-300 bg-white px-3 text-base font-normal text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 ${className}`}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
