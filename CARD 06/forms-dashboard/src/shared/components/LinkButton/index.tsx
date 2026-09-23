import Link from "next/link";
import type { ComponentProps } from "react";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
};

export const LinkButton = ({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-10 items-center justify-center rounded px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${variantClasses[variant]} ${className}`}
    />
  );
};
