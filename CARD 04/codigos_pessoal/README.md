# Card 04: códigos pessoais (TypeScript)

Mini-domínio de gestão de usuários, escrito do zero para praticar os conceitos do card.

- `src/types.ts`: interface, union (`UserRole`), interseção (`UserWithTimestamps`) e generic (`ApiResponse`)
- `src/schemas.ts`: validação com Zod e `z.infer`
- `src/data/users.ts`: array de objetos tipados
- `src/utils/collections.ts`: generics (`sortBy`) e utility types (`Pick`, `Record`)
- `src/services/`: repositório em classe e service com as regras do domínio
- `src/index.ts`: demo executável

Como rodar:

`pnpm install`, depois `pnpm typecheck` e `pnpm demo:users`.
