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

export const seasonChampion = {
  driver: "Max Verstappen",
  team: "Red Bull Racing",
  points: 395.5,
  year: 2021,
};

export const seasonMetrics: SeasonMetric[] = [
  { label: "Vitórias", value: 10, caption: "Max Verstappen" },
  { label: "Pontos", value: 395.5, caption: "Campeão de 2021" },
  { label: "Construtores", value: 613.5, caption: "Mercedes" },
];

export const driverStandings: DriverStanding[] = [
  { position: 1, driver: "Max Verstappen", team: "Red Bull Racing", points: 395.5 },
  { position: 2, driver: "Lewis Hamilton", team: "Mercedes", points: 387.5 },
  { position: 3, driver: "Valtteri Bottas", team: "Mercedes", points: 226 },
];

export const lastRaces: RaceResult[] = [
  { name: "GP de Abu Dhabi", winner: "Max Verstappen" },
  { name: "GP da Arábia Saudita", winner: "Lewis Hamilton" },
  { name: "GP do Catar", winner: "Lewis Hamilton" },
];
