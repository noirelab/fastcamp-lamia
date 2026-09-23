import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(3, "Informe pelo menos 3 caracteres"),
  email: z.email("Informe um e-mail válido"),
  role: z.enum(["admin", "editor", "viewer"]),
});

export const updateUserSchema = createUserSchema
  .pick({ name: true, role: true })
  .extend({ active: z.boolean().optional() })
  .partial();

type ParsedBody<T> = { success: true; data: T } | { success: false; message: string };

// body de request chega como texto: JSON.parse devolve unknown e só o safeParse garante o tipo
export const parseBody = <S extends z.ZodType>(
  schema: S,
  body: string,
): ParsedBody<z.infer<S>> => {
  let payload: unknown;

  try {
    payload = JSON.parse(body);
  } catch {
    return { success: false, message: "Body não é um JSON válido." };
  }

  const result = schema.safeParse(payload);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    return { success: false, message };
  }

  return { success: true, data: result.data };
};
