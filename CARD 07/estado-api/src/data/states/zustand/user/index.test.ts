import { beforeEach, describe, expect, it } from "vitest";
import { getToken, setToken } from "@/data/services/api/token";
import { useUserStore } from "./index";

describe("useUserStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useUserStore.setState({ user: null });
  });

  it("começa sem usuário logado", () => {
    expect(useUserStore.getState().user).toBeNull();
  });

  it("guarda o usuário ao entrar", () => {
    useUserStore.getState().setUser({ name: "Piloto", email: "piloto@f1.com" });

    expect(useUserStore.getState().user).toEqual({
      name: "Piloto",
      email: "piloto@f1.com",
    });
  });

  it("limpa o usuário e o token ao sair", () => {
    setToken("abc123");
    useUserStore.getState().setUser({ name: "Piloto", email: "piloto@f1.com" });
    useUserStore.getState().logout();

    expect(useUserStore.getState().user).toBeNull();
    expect(getToken()).toBeNull();
  });
});
