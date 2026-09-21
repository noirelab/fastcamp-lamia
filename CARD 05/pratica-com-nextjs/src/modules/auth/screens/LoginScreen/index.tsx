"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const LoginScreen = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Login enviado.");
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
        />
        <TextField
          id="password"
          name="password"
          label="Senha"
          type="password"
          placeholder="******"
          required
        />
        <PrimaryButton type="submit">Entrar</PrimaryButton>
      </form>

      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}

      <Link
        href="/perfil"
        className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Ver perfil de exemplo
      </Link>
    </section>
  );
};
