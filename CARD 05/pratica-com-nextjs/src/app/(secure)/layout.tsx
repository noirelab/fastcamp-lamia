import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { SESSION_COOKIE_NAME } from "@/modules/auth/session";

interface SecureLayoutProps {
  children: ReactNode;
}

export default async function SecureLayout({ children }: SecureLayoutProps) {
  const cookieStore = await cookies();

  if (!cookieStore.has(SESSION_COOKIE_NAME)) {
    redirect("/login");
  }

  return children;
}
