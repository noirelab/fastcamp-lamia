"use client";

import { useState } from "react";
import {
  driverStandings,
  lastRaces,
  seasonChampion,
  seasonMetrics,
} from "@/modules/dashboard/data/mock";
import { PrimaryButton } from "@/shared/components/PrimaryButton";

const formatNumber = (value: number) => value.toLocaleString("pt-BR");

const formatTime = (date: Date) =>
  date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export const DashboardScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setUpdatedAt(new Date());
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <section className="grid gap-6">
      <header className="flex flex-col gap-4 rounded border bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">Fórmula 1</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Dashboard da temporada 2021</h1>
          <p className="mt-2 max-w-xl leading-7 text-gray-600">Dados mockados de pilotos, corridas e construtores.</p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <PrimaryButton type="button" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Atualizando..." : "Atualizar dados"}
          </PrimaryButton>
          {updatedAt && (
            <p role="status" className="text-xs text-gray-500">
              Atualizado às {formatTime(updatedAt)}
            </p>
          )}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {seasonMetrics.map((metric) => (
          <article key={metric.label} className="rounded border bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-600">{metric.label}</p>
            <p className="mt-3 text-4xl font-bold text-blue-700">{formatNumber(metric.value)}</p>
            <p className="mt-2 text-sm text-gray-600">{metric.caption}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <article className="rounded border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Classificação de pilotos</h2>
          <ul className="mt-4 grid gap-2">
            {driverStandings.map((standing) => (
              <li key={standing.driver} className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-gray-700">
                <span>
                  {standing.position}. {standing.driver}{" "}
                  <span className="text-sm text-gray-500">{standing.team}</span>
                </span>
                <span className="font-semibold">{formatNumber(standing.points)} pts</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Campeão</h2>
          <div className="mt-5 rounded border bg-gray-50 p-5">
            <p className="text-sm font-semibold text-blue-600">Temporada {seasonChampion.year}</p>
            <p className="mt-2 text-lg font-bold">{seasonChampion.driver}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {formatNumber(seasonChampion.points)} pontos pela {seasonChampion.team}.
            </p>
          </div>
        </article>
      </div>

      <article className="rounded border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Últimas corridas</h2>
        <ul className="mt-5 grid gap-3">
          {lastRaces.map((race) => (
            <li key={race.name} className="rounded bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">{race.name}</p>
              <p className="mt-1 text-sm text-gray-600">1º {race.winner}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};
