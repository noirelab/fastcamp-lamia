import { beforeEach, describe, expect, it } from "vitest";
import { clearToken, getToken, setToken } from "./token";

describe("token", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("lê null quando não há token", () => {
    expect(getToken()).toBeNull();
  });

  it("guarda e lê o token", () => {
    setToken("abc123");

    expect(getToken()).toBe("abc123");
  });

  it("limpa o token", () => {
    setToken("abc123");
    clearToken();

    expect(getToken()).toBeNull();
  });
});
