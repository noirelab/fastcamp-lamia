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

export interface SeasonRace extends RaceResult {
  // pontos acumulados dos líderes depois da corrida
  points: Record<string, number>;
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
  round: number;
  totalRounds: number;
  seasonMetrics: SeasonMetric[];
  driverStandings: DriverStanding[];
  lastRaces: RaceResult[];
  seasonChampion: SeasonChampion;
  evolutionDrivers: string[];
  pointsEvolution: EvolutionRound[];
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

const VER = "Max Verstappen";
const HAM = "Lewis Hamilton";
const BOT = "Valtteri Bottas";

const evolutionDrivers = [VER, HAM, BOT];

const race = (name: string, winner: string, ver: number, ham: number, bot: number): SeasonRace => ({
  name,
  winner,
  points: { [VER]: ver, [HAM]: ham, [BOT]: bot },
});

export const seasonRaces: SeasonRace[] = [
  race("GP do Bahrein", HAM, 18, 25, 16),
  race("GP da Emília-Romanha", VER, 43, 44, 16),
  race("GP de Portugal", HAM, 61, 69, 32),
  race("GP da Espanha", HAM, 80, 94, 47),
  race("GP de Mônaco", VER, 105, 101, 47),
  race("GP do Azerbaijão", "Sergio Pérez", 105, 101, 47),
  race("GP da França", VER, 131, 119, 59),
  race("GP da Estíria", VER, 156, 138, 74),
  race("GP da Áustria", VER, 182, 150, 92),
  race("GP da Grã-Bretanha", HAM, 185, 177, 108),
  race("GP da Hungria", "Esteban Ocon", 187, 195, 108),
  race("GP da Bélgica", VER, 199.5, 202.5, 108),
  race("GP da Holanda", VER, 224.5, 221.5, 123),
  race("GP da Itália", "Daniel Ricciardo", 226.5, 221.5, 141),
  race("GP da Rússia", HAM, 244.5, 246.5, 151),
  race("GP da Turquia", BOT, 262.5, 256.5, 177),
  race("GP dos Estados Unidos", VER, 287.5, 275.5, 185),
  race("GP do México", VER, 312.5, 293.5, 185),
  race("GP do Brasil", HAM, 332.5, 318.5, 203),
  race("GP do Catar", HAM, 351.5, 343.5, 203),
  race("GP da Arábia Saudita", HAM, 369.5, 369.5, 218),
  race("GP de Abu Dhabi", VER, 395.5, 387.5, 226),
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

export const buildSeasonMetrics = (races: SeasonRace[]): SeasonMetric[] => {
  const wins = races.reduce<Record<string, number>>((acc, item) => {
    acc[item.winner] = (acc[item.winner] ?? 0) + 1;
    return acc;
  }, {});
  const [topWinner, topWins] = Object.entries(wins).sort((a, b) => b[1] - a[1])[0];

  const lastRace = races[races.length - 1];
  const [[leader, leaderPoints], [second, secondPoints]] = Object.entries(lastRace.points).sort(
    (a, b) => b[1] - a[1],
  );

  return [
    { label: "Vitórias", value: topWins, caption: topWinner },
    { label: "Pontos do líder", value: leaderPoints, caption: `${leader} após o ${lastRace.name}` },
    { label: "Vantagem", value: leaderPoints - secondPoints, caption: `sobre ${second}` },
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

// simula um endpoint que acompanha a temporada: devolve os dados até a rodada pedida
export const fetchDashboardData = async (
  round: number,
  signal?: AbortSignal,
): Promise<DashboardData> => {
  await delay(600, signal);

  const current = Math.min(Math.max(round, 1), seasonRaces.length);
  const races = seasonRaces.slice(0, current);
  const standings = driverStandings.map((standing) => ({ ...standing }));

  return {
    round: current,
    totalRounds: seasonRaces.length,
    seasonMetrics: buildSeasonMetrics(races),
    driverStandings: standings,
    lastRaces: races
      .slice(-3)
      .reverse()
      .map(({ name, winner }) => ({ name, winner })),
    seasonChampion: buildSeasonChampion(standings),
    evolutionDrivers: [...evolutionDrivers],
    pointsEvolution: races.map((item, index) => ({
      round: `R${index + 1}`,
      points: { ...item.points },
    })),
  };
};
