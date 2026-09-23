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

export interface SeasonChampion {
  driver: string;
  team: string;
  points: number;
  year: number;
}

export interface DashboardData {
  seasonMetrics: SeasonMetric[];
  driverStandings: DriverStanding[];
  lastRaces: RaceResult[];
  seasonChampion: SeasonChampion;
}

const seasonChampion: SeasonChampion = {
  driver: "Max Verstappen",
  team: "Red Bull Racing",
  points: 395.5,
  year: 2021,
};

const seasonMetrics: SeasonMetric[] = [
  { label: "Vitórias", value: 10, caption: "Max Verstappen" },
  { label: "Pontos", value: 395.5, caption: "Campeão de 2021" },
  { label: "Construtores", value: 613.5, caption: "Mercedes" },
];

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// simula a chamada de um endpoint que devolve os dados da temporada
export const fetchDashboardData = async (): Promise<DashboardData> => {
  await delay(600);

  return {
    seasonMetrics,
    driverStandings,
    lastRaces,
    seasonChampion,
  };
};
