"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type IRegisterSchema } from "@/modules/auth/schemas";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const RegisterScreen = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (!isLoading) return;

    const timeout = setTimeout(() => {
      setIsLoading(false);
      setMessage(`Cadastro de ${submittedName} enviado.`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isLoading, submittedName]);

  const onSubmit = (data: IRegisterSchema) => {
    setMessage("");
    setSubmittedName(data.name);
    setIsLoading(true);
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
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Criando conta..." : "Criar conta"}
        </PrimaryButton>
      </form>

      <p role="status" className="mt-4 min-h-5 text-sm text-green-700">
        {message}
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
