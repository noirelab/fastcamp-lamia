import { z } from "zod";

export const metricSchema = z.object({
  label: z.string().trim().min(3, "Informe pelo menos 3 caracteres"),
  value: z
    .string()
    .trim()
    .min(1, "Informe um valor")
    .refine((value) => {
      const parsed = Number(value.replace(",", "."));

      return Number.isFinite(parsed) && parsed > 0;
    }, "Informe um número maior que zero"),
  caption: z.string().trim().min(3, "Informe pelo menos 3 caracteres"),
});

export type MetricInput = z.infer<typeof metricSchema>;
