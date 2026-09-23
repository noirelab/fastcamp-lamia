import axios from "axios";
import { api } from "@/data/services/api";
import { setToken } from "@/data/services/api/token";
import {
  loginResponseSchema,
  type ILoginSchema,
  type LoggedUser,
} from "@/modules/auth/data/schemas/login";

const nameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const isNotFoundError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 404;

export class AuthService {
  static async login(data: ILoginSchema): Promise<LoggedUser> {
    try {
      const response = await api.post<unknown>("/auth/login", data);
      const { token, user } = loginResponseSchema.parse(response.data);

      setToken(token);
      return user;
    } catch (error) {
      if (!isNotFoundError(error)) throw error;

      // o JSONPlaceholder nao tem /auth/login: simula a sessao para a demo
      const user = { name: nameFromEmail(data.email), email: data.email };
      setToken(`mock-token-${crypto.randomUUID()}`);
      return user;
    }
  }
}
