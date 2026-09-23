import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SeasonMetric } from "./data/mock";

export interface CustomMetric extends SeasonMetric {
  id: string;
}

interface MetricsStore {
  customMetrics: CustomMetric[];
  addMetric: (metric: SeasonMetric) => void;
  removeMetric: (id: string) => void;
}

export const useMetricsStore = create<MetricsStore>()(
  persist(
    (set) => ({
      customMetrics: [],
      addMetric: (metric) =>
        set((state) => ({
          customMetrics: [...state.customMetrics, { ...metric, id: crypto.randomUUID() }],
        })),
      removeMetric: (id) =>
        set((state) => ({
          customMetrics: state.customMetrics.filter((metric) => metric.id !== id),
        })),
    }),
    { name: "f1-custom-metrics" },
  ),
);
