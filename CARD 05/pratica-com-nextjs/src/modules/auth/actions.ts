"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/modules/auth/session";

const DEMO_EMAIL = "piloto@f1blog.com";
const DEMO_PASSWORD = "senha123";

export const loginAction = async (email: string, password: string) => {
  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return false;
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: "1",
    httpOnly: true,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: "lax",
  });

  return true;
};

export const logoutAction = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
};
