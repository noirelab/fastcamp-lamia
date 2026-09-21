# Exemplos de aula — TypeScript (Card 04)

Exercícios de TypeScript do card 04 do FastCamp LAMIA.

## Conceitos praticados

| Conceito | Arquivo |
|---|---|
| Tipos primitivos, arrays, tuplas, enum | `src/index.ts` |
| Funções tipadas e interface de função | `src/functions.ts` |
| Objetos tipados, `interface` vs `type` | `src/objects.ts` |
| Classes, herança e modificadores de acesso | `src/classes.ts` |
| Generics (`<T>`) | `src/generics.ts` |
| Utility types (`Partial`, `Pick`, `Omit`, `Record`) | `src/utility-types.ts` |
| Path alias `@/modules/auth` e `z.infer<typeof schema>` | `src/modules/auth/` |

## Como rodar

```bash
pnpm install
pnpm typecheck
pnpm demo:utility
pnpm demo:auth
```

Qualquer arquivo também pode ser executado direto:

```bash
pnpm exec tsx src/generics.ts
```
