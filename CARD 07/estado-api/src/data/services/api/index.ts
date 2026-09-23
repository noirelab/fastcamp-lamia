import axios from "axios";
import { useUserStore } from "@/data/states/zustand/user";
import { getToken } from "./token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (!config.baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL não definida. Copie .env.example para .env.local.");
  }

  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // encerra a sessão inteira: token e usuario da store
      useUserStore.getState().logout();
    }

    return Promise.reject(error);
  },
);
