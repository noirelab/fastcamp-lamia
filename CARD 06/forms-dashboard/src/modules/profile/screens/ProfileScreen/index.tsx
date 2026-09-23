"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

const profileSchema = z.object({
  name: z.string().trim().min(1, "Informe um nome"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export const ProfileScreen = () => {
  const [savedName, setSavedName] = useState("Seu nome");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Seu nome" },
  });

  const onSubmit = (data: ProfileForm) => {
    setSavedName(data.name);
  };

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Meu perfil</h1>
      <p className="mt-2 text-gray-600">Troque seu nome</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4" noValidate>
        <TextField
          id="name"
          label="Nome"
          error={errors.name?.message}
          {...register("name")}
        />
        <PrimaryButton type="submit">Salvar nome</PrimaryButton>
      </form>

      <p role="status" className="mt-5 rounded bg-gray-100 p-3 text-sm text-gray-700">
        Nome salvo: <strong>{savedName}</strong>
      </p>
    </section>
  );
};
