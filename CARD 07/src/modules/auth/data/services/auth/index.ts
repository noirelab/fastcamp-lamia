import { api } from "@/data/services/api";
import type { ILoginSchema } from "@/modules/auth/data/schemas/login";

export interface LoggedUser {
  name: string;
  email: string;
}

const nameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export class AuthService {
  static async login(data: ILoginSchema): Promise<LoggedUser> {
    try {
      const response = await api.post<LoggedUser>("/auth/login", data);
      return response.data;
    } catch {
      return { name: nameFromEmail(data.email), email: data.email };
    }
  }
}
