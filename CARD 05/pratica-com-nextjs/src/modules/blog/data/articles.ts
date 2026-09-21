import type { Article } from "@/modules/blog/types";

export const articles: Article[] = [
  {
    slug: "disputa-pelo-titulo",
    title: "A disputa pelo título em 2021",
    description:
      "Lewis Hamilton e Max Verstappen fizeram uma temporada muito disputada.",
    category: "Temporada",
    date: "2021",
    content: [
      "A temporada de 2021 teve uma grande disputa entre Lewis Hamilton, da Mercedes, e Max Verstappen, da Red Bull.",
      "Os dois pilotos venceram corridas importantes e chegaram muito próximos na classificação até a última etapa.",
    ],
  },
  {
    slug: "final-em-abu-dhabi",
    title: "O final em Abu Dhabi",
    description:
      "A última corrida decidiu o campeonato de Fórmula 1 de 2021.",
    category: "Corridas",
    date: "12/12/2021",
    content: [
      "A corrida em Abu Dhabi foi a última prova da temporada. Hamilton e Verstappen começaram o dia empatados em pontos.",
      "No fim da corrida, Verstappen ultrapassou Hamilton e conquistou seu primeiro título mundial.",
    ],
  },
];
