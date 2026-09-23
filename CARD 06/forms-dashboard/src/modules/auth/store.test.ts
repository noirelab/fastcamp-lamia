// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { MOCK_ACCOUNT, useAuthStore } from "./store";

const newAccount = {
  name: "Lando Norris",
  email: "lando@mclaren.com",
  password: "senha456",
  confirmPassword: "senha456",
};

describe("auth store", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAuthStore.setState({ user: null, accounts: [MOCK_ACCOUNT] });
  });

  it("entra com a conta de demonstração e persiste a sessão", () => {
    const ok = useAuthStore.getState().signIn({
      email: MOCK_ACCOUNT.email,
      password: MOCK_ACCOUNT.password,
    });

    expect(ok).toBe(true);
    expect(useAuthStore.getState().user?.email).toBe(MOCK_ACCOUNT.email);
    expect(window.localStorage.getItem("f1-auth")).toContain(MOCK_ACCOUNT.email);
  });

  it("recusa senha errada", () => {
    const ok = useAuthStore.getState().signIn({ email: MOCK_ACCOUNT.email, password: "errada1" });

    expect(ok).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it("cadastra conta nova que depois consegue entrar", () => {
    expect(useAuthStore.getState().register(newAccount)).toBe(true);
    useAuthStore.getState().signOut();

    expect(useAuthStore.getState().user).toBeNull();
    expect(
      useAuthStore.getState().signIn({ email: newAccount.email, password: newAccount.password }),
    ).toBe(true);
    expect(useAuthStore.getState().user?.name).toBe(newAccount.name);
  });

  it("não cadastra e-mail repetido", () => {
    expect(useAuthStore.getState().register({ ...newAccount, email: MOCK_ACCOUNT.email })).toBe(
      false,
    );
  });

  it("atualiza o nome do usuário logado e da conta", () => {
    useAuthStore.getState().signIn({ email: MOCK_ACCOUNT.email, password: MOCK_ACCOUNT.password });
    useAuthStore.getState().updateName("Novo Nome");
    useAuthStore.getState().signOut();
    useAuthStore.getState().signIn({ email: MOCK_ACCOUNT.email, password: MOCK_ACCOUNT.password });

    expect(useAuthStore.getState().user?.name).toBe("Novo Nome");
  });
});
