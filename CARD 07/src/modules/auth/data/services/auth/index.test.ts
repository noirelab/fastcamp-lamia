import type { AxiosResponse } from "axios";
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

const notFoundError = { isAxiosError: true, response: { status: 404 } };
const serverError = { isAxiosError: true, response: { status: 500 } };

describe("AuthService.login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devolve o usuário da resposta quando a API responde válido", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {
        token: "abc123",
        user: { name: "Piloto", email: "piloto@f1.com" },
      },
    } as AxiosResponse);

    const user = await AuthService.login({ email: "piloto@f1.com", password: "senha123" });

    expect(user).toEqual({ name: "Piloto", email: "piloto@f1.com" });
    expect(setToken).toHaveBeenCalledWith("abc123");
  });

  it("cai no usuário mock quando a API responde 404", async () => {
    mockedPost.mockRejectedValueOnce(notFoundError);

    const user = await AuthService.login({
      email: "kaique.medeiros@f1.com",
      password: "senha123",
    });

    expect(user).toEqual({ name: "Kaique Medeiros", email: "kaique.medeiros@f1.com" });
    expect(setToken).toHaveBeenCalled();
  });

  it("propaga outros erros em vez de simular login", async () => {
    mockedPost.mockRejectedValueOnce(serverError);

    await expect(
      AuthService.login({ email: "piloto@f1.com", password: "senha123" }),
    ).rejects.toBe(serverError);
  });
});
