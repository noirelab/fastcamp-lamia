import { describe, expect, it } from "vitest";
import { loggedUserSchema, loginResponseSchema, loginSchema } from "./login";

describe("loginSchema", () => {
  it("aceita e-mail e senha válidos", () => {
    const result = loginSchema.safeParse({
      email: "piloto@f1.com",
      password: "senha123",
    });

    expect(result.success).toBe(true);
  });

  it("recusa e-mail sem formato válido", () => {
    const result = loginSchema.safeParse({
      email: "piloto",
      password: "senha123",
    });

    expect(result.success).toBe(false);
  });

  it("recusa senha com menos de 6 caracteres", () => {
    const result = loginSchema.safeParse({
      email: "piloto@f1.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});

describe("loginResponseSchema", () => {
  it("aceita resposta com token e usuário", () => {
    const result = loginResponseSchema.safeParse({
      token: "abc123",
      user: { name: "Piloto", email: "piloto@f1.com" },
    });

    expect(result.success).toBe(true);
  });

  it("recusa resposta sem token", () => {
    const result = loginResponseSchema.safeParse({
      user: { name: "Piloto", email: "piloto@f1.com" },
    });

    expect(result.success).toBe(false);
  });

  it("recusa usuário com e-mail inválido", () => {
    const result = loggedUserSchema.safeParse({ name: "Piloto", email: "piloto" });

    expect(result.success).toBe(false);
  });
});
