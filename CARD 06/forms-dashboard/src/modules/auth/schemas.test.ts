import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./schemas";

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

describe("registerSchema", () => {
  const validRegister = {
    name: "Max Verstappen",
    email: "max@redbull.com",
    password: "senha123",
    confirmPassword: "senha123",
  };

  it("aceita cadastro com senhas iguais", () => {
    const result = registerSchema.safeParse(validRegister);

    expect(result.success).toBe(true);
  });

  it("recusa nome só com espaços", () => {
    const result = registerSchema.safeParse({ ...validRegister, name: "   " });

    expect(result.success).toBe(false);
  });

  it("aponta a confirmação de senha quando as senhas são diferentes", () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      confirmPassword: "outra123",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["confirmPassword"]);
      expect(result.error.issues[0].message).toBe("As senhas precisam ser iguais");
    }
  });
});
