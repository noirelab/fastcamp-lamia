import { createJSONStorage, type StateStorage } from "zustand/middleware";

const memoryStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const createSafeStorage = () =>
  createJSONStorage(() => (typeof window === "undefined" ? memoryStorage : localStorage));
