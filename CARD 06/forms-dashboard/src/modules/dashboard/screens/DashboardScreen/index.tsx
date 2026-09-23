"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchDashboardData, type DashboardData } from "@/modules/dashboard/data/mock";
import { PrimaryButton } from "@/shared/components/PrimaryButton";

const ALL_TEAMS = "all";

const formatNumber = (value: number) => value.toLocaleString("pt-BR");

const formatTime = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const isAbortError = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError";

export const DashboardScreen = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState(ALL_TEAMS);

  useEffect(() => {
    const controller = new AbortController();

    fetchDashboardData(controller.signal)
      .then(setData)
      .catch((loadError: unknown) => {
        if (isAbortError(loadError)) return;
        setError("Não foi possível carregar os dados da temporada.");
      });

    return () => controller.abort();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (refreshError) {
      if (!isAbortError(refreshError)) {
        setError("Não foi possível atualizar os dados.");
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const teams = useMemo(
    () => Array.from(new Set((data?.driverStandings ?? []).map((standing) => standing.team))).sort(),
    [data],
  );

  const visibleStandings = useMemo(
    () =>
      (data?.driverStandings ?? []).filter(
        (standing) => selectedTeam === ALL_TEAMS || standing.team === selectedTeam,
      ),
    [data, selectedTeam],
  );

  const chartLabel = `Gráfico de barras com os pontos por piloto (${
    selectedTeam === ALL_TEAMS ? "todas as equipes" : selectedTeam
  })`;

  if (!data) {
    if (error) {
      return (
        <section className="rounded border bg-white p-6 shadow-sm">
          <div className="grid justify-items-start gap-3">
            <p role="alert" className="text-red-600">
              {error}
            </p>
            <PrimaryButton type="button" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? "Tentando..." : "Tentar novamente"}
            </PrimaryButton>
          </div>
        </section>
      );
    }

    return (
      <section className="rounded border bg-white p-6 shadow-sm">
        <p role="status" className="text-gray-600">
          Carregando dados da temporada...
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-6">
      <header className="flex flex-col gap-4 rounded border bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">Fórmula 1</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Dashboard da temporada {data.seasonChampion.year}
          </h1>
          <p className="mt-2 max-w-xl leading-7 text-gray-600">
            Dados mockados de pilotos, corridas e construtores.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <PrimaryButton type="button" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Atualizando..." : "Atualizar dados"}
          </PrimaryButton>
          <p role="status" className="text-xs text-gray-500">
            Atualizado às {formatTime(data.updatedAt)}
          </p>
        </div>
      </header>

      {error && (
        <p role="alert" className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {data.seasonMetrics.map((metric) => (
          <article key={metric.label} className="rounded border bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-600">{metric.label}</p>
            <p className="mt-3 text-4xl font-bold text-blue-700">{formatNumber(metric.value)}</p>
            <p className="mt-2 text-sm text-gray-600">{metric.caption}</p>
          </article>
        ))}
      </div>

      <article className="rounded border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pontos por piloto</h2>
            <p className="mt-1 text-sm text-gray-600">
              {selectedTeam === ALL_TEAMS ? "Todas as equipes" : selectedTeam}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="team-filter" className="text-sm font-semibold text-gray-700">
              Equipe
            </label>
            <select
              id="team-filter"
              value={selectedTeam}
              onChange={(event) => setSelectedTeam(event.target.value)}
              className="min-h-10 rounded border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
            >
              <option value={ALL_TEAMS}>Todas</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>

        {visibleStandings.length > 0 ? (
          <div role="img" aria-label={chartLabel} className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visibleStandings} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="driver"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="points" name="Pontos" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-6 rounded bg-gray-50 p-5 text-gray-600">
            Nenhum piloto encontrado para esta equipe.
          </p>
        )}
      </article>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <article className="rounded border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Classificação de pilotos</h2>
          {visibleStandings.length > 0 ? (
            <ul className="mt-4 grid gap-2">
              {visibleStandings.map((standing) => (
                <li
                  key={standing.driver}
                  className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-gray-700"
                >
                  <span>
                    {standing.position}. {standing.driver}{" "}
                    <span className="text-sm text-gray-500">{standing.team}</span>
                  </span>
                  <span className="font-semibold">{formatNumber(standing.points)} pts</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">Nenhum piloto encontrado para esta equipe.</p>
          )}
        </article>

        <article className="rounded border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Campeão</h2>
          <div className="mt-5 rounded border bg-gray-50 p-5">
            <p className="text-sm font-semibold text-blue-600">Temporada {data.seasonChampion.year}</p>
            <p className="mt-2 text-lg font-bold">{data.seasonChampion.driver}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {formatNumber(data.seasonChampion.points)} pontos pela {data.seasonChampion.team}.
            </p>
          </div>
        </article>
      </div>

      <article className="rounded border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Últimas corridas</h2>
        <ul className="mt-5 grid gap-3">
          {data.lastRaces.map((race) => (
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
