import axios from "axios";
import { api } from "@/data/services/api";
import { setToken } from "@/data/services/api/token";
import {
  loginResponseSchema,
  loginSchema,
  type LoggedUser,
} from "@/modules/auth/data/schemas/login";

const nameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const USE_MOCK_AUTH = process.env.NEXT_PUBLIC_USE_MOCK_AUTH !== "false";

const createMockToken = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `mock-token-${crypto.randomUUID()}`;
  }

  return `mock-token-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const isMockEligibleError = (error: unknown) =>
  USE_MOCK_AUTH &&
  axios.isAxiosError(error) &&
  error.response?.status === 404 &&
  Boolean(error.config?.url?.includes("/auth/login"));

export class AuthService {
  static async login(payload: unknown): Promise<LoggedUser> {
    // valida a entrada em runtime antes de qualquer chamada
    const data = loginSchema.parse(payload);

    try {
      const response = await api.post<unknown>("/auth/login", data);
      const { token, user } = loginResponseSchema.parse(response.data);

      setToken(token);
      return user;
    } catch (error) {
      if (!isMockEligibleError(error)) throw error;

      // o JSONPlaceholder não tem /auth/login: simula a sessão para a demo
      const user = { name: nameFromEmail(data.email), email: data.email };
      setToken(createMockToken());
      return user;
    }
  }
}
