import type { UserWithTimestamps } from "@/types";

export const users: UserWithTimestamps[] = [
  {
    id: "u-01",
    name: "Ana Souza",
    email: "ana@fastcamp.dev",
    role: "admin",
    active: true,
    createdAt: "2026-09-02T10:00:00.000Z",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "u-02",
    name: "Bruno Lima",
    email: "bruno@fastcamp.dev",
    role: "editor",
    active: true,
    createdAt: "2026-09-05T14:30:00.000Z",
    updatedAt: "2026-09-10T09:15:00.000Z",
  },
  {
    id: "u-03",
    name: "Carla Nunes",
    email: "carla@fastcamp.dev",
    role: "viewer",
    active: false,
    createdAt: "2026-09-07T08:45:00.000Z",
    updatedAt: "2026-09-07T08:45:00.000Z",
  },
  {
    id: "u-04",
    name: "Diego Prado",
    email: "diego@fastcamp.dev",
    role: "editor",
    active: true,
    createdAt: "2026-09-12T16:20:00.000Z",
    updatedAt: "2026-09-12T16:20:00.000Z",
  },
];
