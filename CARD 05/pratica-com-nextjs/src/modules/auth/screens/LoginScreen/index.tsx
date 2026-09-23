"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/modules/auth/actions";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loggedIn = await loginAction(email.trim().toLowerCase(), password);

      setHasError(!loggedIn);
      setMessage(
        loggedIn ? `Login feito como ${email}.` : "E-mail ou senha incorretos.",
      );
    } catch {
      setHasError(true);
      setMessage("Não foi possível entrar. Tente novamente.");
    }
  };

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-2 text-gray-600">Entre para acessar seu perfil.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <TextField
          id="email"
          name="email"
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id="password"
          name="password"
          label="Senha"
          type="password"
          placeholder="******"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <PrimaryButton type="submit">Entrar</PrimaryButton>
      </form>

      {message && (
        <p
          role={hasError ? "alert" : "status"}
          className={`mt-4 text-sm ${hasError ? "text-red-600" : "text-green-700"}`}
        >
          {message}
        </p>
      )}

      {message && !hasError && (
        <Link
          href="/perfil"
          className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Ver meu perfil
        </Link>
      )}
    </section>
  );
};
