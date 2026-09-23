import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Informe um nome"),
});

export type IProfileSchema = z.infer<typeof profileSchema>;
