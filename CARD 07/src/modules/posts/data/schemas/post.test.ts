import { describe, expect, it } from "vitest";
import { postSchema, postsSchema } from "./post";

describe("postsSchema", () => {
  it("aceita uma lista de posts válida", () => {
    const result = postsSchema.safeParse([
      { id: 1, title: "Título", body: "Conteúdo" },
    ]);

    expect(result.success).toBe(true);
  });

  it("recusa post com campo faltando", () => {
    const result = postSchema.safeParse({ id: 1, title: "Título" });

    expect(result.success).toBe(false);
  });

  it("recusa id que não é número", () => {
    const result = postSchema.safeParse({ id: "1", title: "Título", body: "Conteúdo" });

    expect(result.success).toBe(false);
  });
});
