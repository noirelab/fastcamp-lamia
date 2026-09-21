import type { ReactNode } from "react";

interface SecureLayoutProps {
  children: ReactNode;
}

export default function SecureLayout({ children }: SecureLayoutProps) {
  return children;
}
