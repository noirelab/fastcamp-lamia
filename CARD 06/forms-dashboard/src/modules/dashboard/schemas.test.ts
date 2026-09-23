import { describe, expect, it } from "vitest";
import { metricSchema } from "./schemas";

describe("metricSchema", () => {
  it("aceita métrica válida", () => {
    const result = metricSchema.safeParse({
      label: "Poles",
      value: "10",
      caption: "Max Verstappen",
    });

    expect(result.success).toBe(true);
  });

  it("aceita vírgula como separador decimal", () => {
    const result = metricSchema.safeParse({
      label: "Poles",
      value: "10,5",
      caption: "Max Verstappen",
    });

    expect(result.success).toBe(true);
  });

  it("recusa rótulo com menos de 3 caracteres", () => {
    const result = metricSchema.safeParse({
      label: "Po",
      value: "10",
      caption: "Max Verstappen",
    });

    expect(result.success).toBe(false);
  });

  it("recusa valor que não é número", () => {
    const result = metricSchema.safeParse({
      label: "Poles",
      value: "dez",
      caption: "Max Verstappen",
    });

    expect(result.success).toBe(false);
  });
});
