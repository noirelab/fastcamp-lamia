"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MetricForm } from "@/modules/dashboard/components/MetricForm";
import { fetchDashboardData, type DashboardData } from "@/modules/dashboard/data/mock";
import { useMetricsStore } from "@/modules/dashboard/store";
import { PrimaryButton } from "@/shared/components/PrimaryButton";

const ALL_TEAMS = "all";

const INITIAL_ROUND = 12;

const LINE_COLORS = ["#1d4ed8", "#dc2626", "#059669", "#d97706"];

const formatNumber = (value: number) => value.toLocaleString("pt-BR");

const isAbortError = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError";

export const DashboardScreen = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState(ALL_TEAMS);
  const customMetrics = useMetricsStore((state) => state.customMetrics);
  const addMetric = useMetricsStore((state) => state.addMetric);
  const removeMetric = useMetricsStore((state) => state.removeMetric);
  const refreshController = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchDashboardData(INITIAL_ROUND, controller.signal)
      .then(setData)
      .catch((loadError: unknown) => {
        if (isAbortError(loadError)) return;
        setError("Não foi possível carregar os dados da temporada.");
      });

    return () => controller.abort();
  }, []);

  useEffect(() => () => refreshController.current?.abort(), []);

  const handleRefresh = async () => {
    refreshController.current?.abort();
    const controller = new AbortController();
    refreshController.current = controller;

    setIsRefreshing(true);
    setError(null);

    try {
      const result = await fetchDashboardData(
        data ? data.round + 1 : INITIAL_ROUND,
        controller.signal,
      );
      setData(result);
    } catch (refreshError) {
      if (!isAbortError(refreshError)) {
        setError("Não foi possível atualizar os dados.");
      }
    } finally {
      if (!controller.signal.aborted) setIsRefreshing(false);
    }
  };

  const teams = useMemo(
    () =>
      Array.from(new Set((data?.driverStandings ?? []).map((standing) => standing.team))).sort(),
    [data],
  );

  const visibleStandings = useMemo(
    () =>
      (data?.driverStandings ?? []).filter(
        (standing) => selectedTeam === ALL_TEAMS || standing.team === selectedTeam,
      ),
    [data, selectedTeam],
  );

  const evolutionData = useMemo(
    () =>
      (data?.pointsEvolution ?? []).map((entry) => ({
        round: entry.round,
        ...entry.points,
      })),
    [data],
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

  const isSeasonOver = data.round === data.totalRounds;

  const metricCards = [
    ...data.seasonMetrics.map((metric) => ({ ...metric, id: metric.label, isCustom: false })),
    ...customMetrics.map((metric) => ({ ...metric, isCustom: true })),
  ];

  return (
    <section className="grid gap-6">
      <header className="flex flex-col gap-4 rounded border bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">Fórmula 1</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Dashboard da temporada {data.seasonLeader.year}
          </h1>
          <p className="mt-2 max-w-xl leading-7 text-gray-600">
            Fonte simulada: um mock local que libera a próxima corrida de 2021 a cada atualização.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <PrimaryButton
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing || isSeasonOver}
          >
            {isRefreshing
              ? "Atualizando..."
              : isSeasonOver
                ? "Temporada completa"
                : "Atualizar dados"}
          </PrimaryButton>
          <p role="status" className="text-xs text-gray-500">
            Rodada {data.round} de {data.totalRounds}: {data.lastRaces[0].name}
          </p>
        </div>
      </header>

      {error && (
        <p
          role="alert"
          className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {metricCards.map((metric) => (
          <article key={metric.id} className="rounded border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-gray-600">{metric.label}</p>
              {metric.isCustom && (
                <button
                  type="button"
                  onClick={() => removeMetric(metric.id)}
                  aria-label={`Remover métrica ${metric.label}`}
                  className="text-xs font-semibold text-gray-500 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Remover
                </button>
              )}
            </div>
            <p className="mt-3 text-4xl font-bold text-blue-700">{formatNumber(metric.value)}</p>
            <p className="mt-2 text-sm text-gray-600">{metric.caption}</p>
          </article>
        ))}
      </div>

      <article className="rounded border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Adicionar métrica</h2>
        <p className="mt-1 text-sm text-gray-600">
          A métrica entra no painel assim que o formulário é enviado e fica salva neste navegador.
        </p>
        <MetricForm onAddMetric={addMetric} />
      </article>

      <article className="rounded border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Evolução dos líderes</h2>
        <p className="mt-1 text-sm text-gray-600">Pontos acumulados até a rodada {data.round}</p>

        <div
          role="img"
          aria-label="Gráfico de linhas com a evolução de pontos dos líderes por rodada"
          className="mt-6 h-80 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="round" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              {data.evolutionDrivers.map((driver, index) => (
                <Line
                  key={driver}
                  type="monotone"
                  dataKey={driver}
                  stroke={LINE_COLORS[index % LINE_COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
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

        <article className="rounded border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">{isSeasonOver ? "Campeão" : "Líder"}</h2>
          <div className="mt-5 rounded border bg-gray-50 p-5">
            <p className="text-sm font-semibold text-blue-600">
              {isSeasonOver
                ? `Temporada ${data.seasonLeader.year}`
                : `Após a rodada ${data.round} de ${data.totalRounds}`}
            </p>
            <p className="mt-2 text-lg font-bold">{data.seasonLeader.driver}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {formatNumber(data.seasonLeader.points)} pontos pela {data.seasonLeader.team}.
            </p>
          </div>
        </article>
      </div>

      <section
        aria-labelledby="final-standings"
        className="grid gap-6 rounded border-2 border-dashed border-gray-300 p-4 sm:p-6"
      >
        <div>
          <h2 id="final-standings" className="text-2xl font-bold text-gray-900">
            Classificação final de {data.seasonLeader.year}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Resultado ao fim das {data.totalRounds} rodadas. Não acompanha a rodada exibida acima.
          </p>
        </div>

        <article className="rounded border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Pontos por piloto</h3>
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

        <article className="rounded border bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">Pilotos</h3>
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
      </section>
    </section>
  );
};
