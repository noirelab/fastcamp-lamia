import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/data/services/api", () => ({
  api: { post: vi.fn() },
}));

vi.mock("@/data/services/api/token", () => ({
  getToken: vi.fn(() => null),
  setToken: vi.fn(),
  clearToken: vi.fn(),
}));

import { api } from "@/data/services/api";
import { setToken } from "@/data/services/api/token";
import { AuthService } from "./index";

const mockedPost = vi.mocked(api.post);

const makeAxiosError = (status: number, url = "/auth/login") =>
  new AxiosError(
    `Request failed with status code ${status}`,
    "ERR_BAD_RESPONSE",
    { url } as InternalAxiosRequestConfig,
    undefined,
    { status } as AxiosResponse,
  );

const makeResponse = (data: unknown) =>
  ({
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: { headers: {} } as InternalAxiosRequestConfig,
  }) as AxiosResponse;

describe("AuthService.login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devolve o usuário da resposta quando a API responde válido", async () => {
    mockedPost.mockResolvedValueOnce(
      makeResponse({
        token: "abc123",
        user: { name: "Piloto", email: "piloto@f1.com" },
      }),
    );

    const user = await AuthService.login({ email: "piloto@f1.com", password: "senha123" });

    expect(user).toEqual({ name: "Piloto", email: "piloto@f1.com" });
    expect(setToken).toHaveBeenCalledWith("abc123");
  });

  it("cai no usuário mock quando /auth/login responde 404", async () => {
    mockedPost.mockRejectedValueOnce(makeAxiosError(404));

    const user = await AuthService.login({
      email: "kaique.medeiros@f1.com",
      password: "senha123",
    });

    expect(user).toEqual({ name: "Kaique Medeiros", email: "kaique.medeiros@f1.com" });
    expect(setToken).toHaveBeenCalled();
  });

  it("propaga 404 de outra rota em vez de simular login", async () => {
    const otherNotFound = makeAxiosError(404, "/posts");
    mockedPost.mockRejectedValueOnce(otherNotFound);

    await expect(
      AuthService.login({ email: "piloto@f1.com", password: "senha123" }),
    ).rejects.toBe(otherNotFound);
  });

  it("recusa payload inválido antes de chamar a API", async () => {
    await expect(
      AuthService.login({ email: "sem-arroba", password: "123" }),
    ).rejects.toThrow();

    expect(mockedPost).not.toHaveBeenCalled();
  });

  it("propaga outros erros em vez de simular login", async () => {
    const serverError = makeAxiosError(500);
    mockedPost.mockRejectedValueOnce(serverError);

    await expect(
      AuthService.login({ email: "piloto@f1.com", password: "senha123" }),
    ).rejects.toBe(serverError);
  });
});
