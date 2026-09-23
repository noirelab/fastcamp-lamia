import { beforeEach, describe, expect, it } from "vitest";
import { useUserStore } from "@/data/states/zustand/user";
import { api } from "./index";
import { getToken, setToken } from "./token";

describe("api", () => {
  beforeEach(() => {
    localStorage.clear();
    useUserStore.setState({ user: null });
  });

  it("limpa token e usuário quando a API responde 401", async () => {
    setToken("abc123");
    useUserStore.getState().setUser({ name: "Piloto", email: "piloto@f1.com" });

    api.defaults.adapter = async () => {
      const error = new Error("Request failed with status code 401") as Error & {
        isAxiosError: boolean;
        response: { status: number };
      };

      error.isAxiosError = true;
      error.response = { status: 401 };

      throw error;
    };

    await expect(api.get("/protegido")).rejects.toThrow("Request failed with status code 401");

    expect(getToken()).toBeNull();
    expect(useUserStore.getState().user).toBeNull();
  });

  it("falha com mensagem clara quando NEXT_PUBLIC_API_URL não está definida", async () => {
    await expect(api.get("/posts", { baseURL: "" })).rejects.toThrow("NEXT_PUBLIC_API_URL");
  });
});
