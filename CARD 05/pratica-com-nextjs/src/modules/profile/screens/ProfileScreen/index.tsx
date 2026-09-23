"use client";

import { useState } from "react";
import { PrimaryButton } from "@/shared/components/PrimaryButton";
import { TextField } from "@/shared/components/TextField";

export const ProfileScreen = () => {
  const [name, setName] = useState("Kaíque");
  const [savedName, setSavedName] = useState("Kaíque");

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Meu perfil</h1>
      <p className="mt-2 text-gray-600">Troque seu nome</p>

      <div className="mt-6">
        <TextField
          id="name"
          label="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <PrimaryButton
        type="button"
        onClick={() => setSavedName(name)}
        className="mt-4"
      >
        Salvar nome
      </PrimaryButton>

      <p className="mt-5 rounded bg-gray-100 p-3 text-sm text-gray-700">
        Nome salvo: <strong>{savedName}</strong>
      </p>
    </section>
  );
};
