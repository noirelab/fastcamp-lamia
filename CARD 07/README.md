# Card 07 - Estado Global e API

Dashboard educacional com Next.js, TypeScript, Zustand, TanStack Query e Axios.

## O que tem

- Cliente Axios em `src/data/services/api` com interceptors de requisição e resposta.
- Service de posts em `src/modules/posts/data/services/posts`.
- Service de autenticação em `src/modules/auth/data/services/auth`.
- Hook `usePostsQuery` com TanStack Query para listar posts da API pública.
- Mutation `useLoginMutation` que grava o usuário na store ao entrar.
- Store Zustand de usuário mockado em `src/data/states/zustand/user`.
- Nome do usuário mostrado no header após entrar.

A API pública (JSONPlaceholder) não tem endpoint de autenticação, então o `AuthService` devolve um usuário mock quando o `POST /auth/login` falha. As ações de login usam dados simulados; não existe backend real.

## Rodar

```bash
pnpm install
pnpm dev
```

Use `.env.example` como referência para configurar `NEXT_PUBLIC_API_URL`.

## Verificar

```bash
pnpm lint
pnpm test
pnpm build
```
