"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type IRegisterSchema } from "@/modules/auth/schemas";
import { useAuthStore } from "@/modules/auth/store";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const RegisterScreen = () => {
  const [error, setError] = useState("");
  const registerAccount = useAuthStore((state) => state.register);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IRegisterSchema) => {
    if (!registerAccount(data)) {
      setError("Já existe uma conta com esse e-mail.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Cadastro</h1>
      <p className="mt-2 text-gray-600">Crie sua conta para acompanhar a Fórmula 1.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4" noValidate>
        <TextField
          id="name"
          label="Nome"
          placeholder="Seu nome"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
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
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <TextField
          id="confirmPassword"
          label="Confirmar senha"
          type="password"
          placeholder="Repita sua senha"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <PrimaryButton type="submit">Criar conta</PrimaryButton>
      </form>

      <p role="alert" className="mt-4 min-h-5 text-sm text-red-600">
        {error}
      </p>

      <Link
        href="/login"
        className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Já tenho uma conta
      </Link>
    </section>
  );
};
