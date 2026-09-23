import { beforeEach, describe, expect, it } from "vitest";
import { useUserStore } from "./index";

describe("useUserStore", () => {
  beforeEach(() => {
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

  it("limpa o usuário ao sair", () => {
    useUserStore.getState().setUser({ name: "Piloto", email: "piloto@f1.com" });
    useUserStore.getState().logout();

    expect(useUserStore.getState().user).toBeNull();
  });
});
