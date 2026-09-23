import axios from "axios";
import { useUserStore } from "@/data/states/zustand/user";
import { getToken } from "./token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com",
});

api.interceptors.request.use((config) => {
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
      // encerra a sessao inteira: token e usuario da store
      useUserStore.getState().logout();
    }

    return Promise.reject(error);
  },
);
