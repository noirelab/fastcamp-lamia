import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(3, "Informe pelo menos 3 caracteres"),
  email: z.email("Informe um e-mail válido"),
  role: z.enum(["admin", "editor", "viewer"]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// dado externo (body de request, formulário) chega como unknown
export const parseCreateUser = (payload: unknown): CreateUserInput =>
  createUserSchema.parse(payload);

export const updateUserSchema = createUserSchema
  .pick({ name: true, role: true })
  .extend({ active: z.boolean().optional() })
  .partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
