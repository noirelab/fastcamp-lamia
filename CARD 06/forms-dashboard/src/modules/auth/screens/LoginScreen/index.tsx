"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type ILoginSchema } from "@/modules/auth/schemas";
import { MOCK_ACCOUNT, useAuthStore } from "@/modules/auth/store";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const LoginScreen = () => {
  const [error, setError] = useState("");
  const signIn = useAuthStore((state) => state.signIn);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: ILoginSchema) => {
    if (!signIn(data)) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    router.push("/dashboard");
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
        <PrimaryButton type="submit">Entrar</PrimaryButton>
      </form>

      <p role="alert" className="mt-4 min-h-5 text-sm text-red-600">
        {error}
      </p>

      <p className="mt-2 text-sm text-gray-600">
        Conta de demonstração: {MOCK_ACCOUNT.email} / {MOCK_ACCOUNT.password}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <Link
          href="/cadastro"
          className="text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Criar uma conta
        </Link>
      </div>
    </section>
  );
};
