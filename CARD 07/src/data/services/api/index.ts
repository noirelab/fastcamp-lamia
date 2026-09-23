import axios from "axios";
import { clearToken, getToken } from "./token";

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
      clearToken();
    }

    return Promise.reject(error);
  },
);
