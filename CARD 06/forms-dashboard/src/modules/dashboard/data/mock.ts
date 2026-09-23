export interface SeasonMetric {
  label: string;
  value: number;
  caption: string;
}

export interface DriverStanding {
  position: number;
  driver: string;
  team: string;
  points: number;
}

export interface RaceResult {
  name: string;
  winner: string;
}

export interface RaceWinner {
  race: string;
  winner: string;
}

export interface SeasonChampion {
  driver: string;
  team: string;
  points: number;
  year: number;
}

export interface EvolutionRound {
  round: string;
  points: Record<string, number>;
}

export interface DashboardData {
  seasonMetrics: SeasonMetric[];
  driverStandings: DriverStanding[];
  lastRaces: RaceResult[];
  seasonChampion: SeasonChampion;
  evolutionDrivers: string[];
  pointsEvolution: EvolutionRound[];
  updatedAt: string;
}

const driverStandings: DriverStanding[] = [
  { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", points: 395.5 },
  { position: 2, driver: "Lewis Hamilton", team: "Mercedes", points: 387.5 },
  { position: 3, driver: "Valtteri Bottas", team: "Mercedes", points: 226 },
  { position: 4, driver: "Sergio Pérez", team: "Red Bull Racing", points: 190 },
  { position: 5, driver: "Carlos Sainz", team: "Ferrari", points: 164.5 },
  { position: 6, driver: "Lando Norris", team: "McLaren", points: 160 },
  { position: 7, driver: "Charles Leclerc", team: "Ferrari", points: 159 },
  { position: 8, driver: "Daniel Ricciardo", team: "McLaren", points: 115 },
  { position: 9, driver: "Pierre Gasly", team: "AlphaTauri", points: 110 },
  { position: 10, driver: "Fernando Alonso", team: "Alpine", points: 81 },
];

const lastRaces: RaceResult[] = [
  { name: "GP de Abu Dhabi", winner: "Max Verstappen" },
  { name: "GP da Arábia Saudita", winner: "Lewis Hamilton" },
  { name: "GP do Catar", winner: "Lewis Hamilton" },
];

const raceWinners: RaceWinner[] = [
  { race: "GP do Bahrein", winner: "Lewis Hamilton" },
  { race: "GP da Emília-Romanha", winner: "Max Verstappen" },
  { race: "GP de Portugal", winner: "Lewis Hamilton" },
  { race: "GP da Espanha", winner: "Lewis Hamilton" },
  { race: "GP de Mônaco", winner: "Max Verstappen" },
  { race: "GP do Azerbaijão", winner: "Sergio Pérez" },
  { race: "GP da França", winner: "Max Verstappen" },
  { race: "GP da Estíria", winner: "Max Verstappen" },
  { race: "GP da Áustria", winner: "Max Verstappen" },
  { race: "GP da Grã-Bretanha", winner: "Lewis Hamilton" },
  { race: "GP da Hungria", winner: "Esteban Ocon" },
  { race: "GP da Bélgica", winner: "Max Verstappen" },
  { race: "GP da Holanda", winner: "Max Verstappen" },
  { race: "GP da Itália", winner: "Daniel Ricciardo" },
  { race: "GP da Rússia", winner: "Lewis Hamilton" },
  { race: "GP da Turquia", winner: "Valtteri Bottas" },
  { race: "GP dos Estados Unidos", winner: "Max Verstappen" },
  { race: "GP do México", winner: "Max Verstappen" },
  { race: "GP do Brasil", winner: "Lewis Hamilton" },
  { race: "GP do Catar", winner: "Lewis Hamilton" },
  { race: "GP da Arábia Saudita", winner: "Lewis Hamilton" },
  { race: "GP de Abu Dhabi", winner: "Max Verstappen" },
];

const evolutionDrivers = ["Max Verstappen", "Lewis Hamilton", "Valtteri Bottas"];

// série ilustrativa: só os totais finais batem com a classificação
const pointsEvolution: EvolutionRound[] = [
  {
    round: "R5",
    points: { "Max Verstappen": 105, "Lewis Hamilton": 101, "Valtteri Bottas": 47 },
  },
  {
    round: "R10",
    points: { "Max Verstappen": 185, "Lewis Hamilton": 177, "Valtteri Bottas": 108 },
  },
  {
    round: "R15",
    points: { "Max Verstappen": 244.5, "Lewis Hamilton": 246.5, "Valtteri Bottas": 151 },
  },
  {
    round: "R19",
    points: { "Max Verstappen": 332.5, "Lewis Hamilton": 318.5, "Valtteri Bottas": 203 },
  },
  {
    round: "R21",
    points: { "Max Verstappen": 369.5, "Lewis Hamilton": 369.5, "Valtteri Bottas": 218 },
  },
  {
    round: "R22",
    points: { "Max Verstappen": 395.5, "Lewis Hamilton": 387.5, "Valtteri Bottas": 226 },
  },
];

const buildSeasonChampion = (standings: DriverStanding[]): SeasonChampion => {
  const [leader] = [...standings].sort((a, b) => b.points - a.points);

  return {
    driver: leader.driver,
    team: leader.team,
    points: leader.points,
    year: 2021,
  };
};

const buildSeasonMetrics = (
  standings: DriverStanding[],
  champion: SeasonChampion,
): SeasonMetric[] => {
  const wins = raceWinners.reduce<Record<string, number>>((acc, race) => {
    acc[race.winner] = (acc[race.winner] ?? 0) + 1;
    return acc;
  }, {});
  const [topWinner, topWins] = Object.entries(wins).sort((a, b) => b[1] - a[1])[0];

  const teamPoints = standings.reduce<Record<string, number>>((acc, standing) => {
    acc[standing.team] = (acc[standing.team] ?? 0) + standing.points;
    return acc;
  }, {});
  const [topTeam, topTeamPoints] = Object.entries(teamPoints).sort((a, b) => b[1] - a[1])[0];

  return [
    { label: "Vitórias", value: topWins, caption: topWinner },
    { label: "Pontos", value: champion.points, caption: `${champion.driver} (campeão)` },
    { label: "Construtores", value: topTeamPoints, caption: topTeam },
  ];
};

const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Requisição cancelada", "AbortError"));
      return;
    }

    const timeout = setTimeout(resolve, ms);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(new DOMException("Requisição cancelada", "AbortError"));
      },
      { once: true },
    );
  });

// simula um endpoint: o payload mock é fixo, mas cada chamada devolve cópias novas
export const fetchDashboardData = async (signal?: AbortSignal): Promise<DashboardData> => {
  await delay(600, signal);

  const standings = driverStandings.map((standing) => ({ ...standing }));
  const champion = buildSeasonChampion(standings);

  return {
    seasonMetrics: buildSeasonMetrics(standings, champion),
    driverStandings: standings,
    lastRaces: lastRaces.map((race) => ({ ...race })),
    seasonChampion: champion,
    evolutionDrivers: [...evolutionDrivers],
    pointsEvolution: pointsEvolution.map((entry) => ({
      round: entry.round,
      points: { ...entry.points },
    })),
    updatedAt: new Date().toISOString(),
  };
};
