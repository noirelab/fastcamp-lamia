"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/modules/auth/store";
import { profileSchema, type IProfileSchema } from "@/modules/profile/schemas";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const updateName = useAuthStore((state) => state.updateName);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "" },
  });

  const onSubmit = (data: IProfileSchema) => {
    updateName(data.name);
  };

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Meu perfil</h1>
      <p className="mt-2 text-gray-600">Troque seu nome</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4" noValidate>
        <TextField id="name" label="Nome" error={errors.name?.message} {...register("name")} />
        <PrimaryButton type="submit">Salvar nome</PrimaryButton>
      </form>

      <p role="status" className="mt-5 rounded bg-gray-100 p-3 text-sm text-gray-700">
        Nome salvo: <strong>{user?.name}</strong> ({user?.email})
      </p>
    </section>
  );
};
