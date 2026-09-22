"use client";

import { useState } from "react";
import { PrimaryButton } from "@/shared/components/PrimaryButton";

export const ProfileScreen = () => {
  const [name, setName] = useState("Seu nome");
  const [savedName, setSavedName] = useState("Seu nome");

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Meu perfil</h1>
      <p className="mt-2 text-gray-600">Troque seu nome</p>

      <div className="mt-6 grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
          Nome
        </label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
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
