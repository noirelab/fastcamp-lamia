"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type ILoginSchema } from "@/modules/auth/schemas";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const LoginScreen = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILoginSchema) => {
    setIsLoading(true);
    setMessage("");
    setTimeout(() => {
      setIsLoading(false);
      setMessage(`Login enviado para ${data.email}.`);
    }, 1000);
  };

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-2 text-gray-600">Entre para ver dados da temporada de Fórmula 1.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4" noValidate>
        <TextField
          id="email"
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </PrimaryButton>
      </form>

      {message && <p role="status" className="mt-4 text-sm text-green-700">{message}</p>}

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <Link
          href="/cadastro"
          className="text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Criar uma conta
        </Link>
        <Link
          href="/dashboard"
          className="text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Ver dashboard de exemplo
        </Link>
      </div>
    </section>
  );
};
