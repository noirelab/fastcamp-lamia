import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

export const loggedUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
});

export type LoggedUser = z.infer<typeof loggedUserSchema>;

export const loginResponseSchema = z.object({
  token: z.string().min(1),
  user: loggedUserSchema,
});
