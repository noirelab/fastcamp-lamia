# Card 07 - Estado Global e API

Dashboard educacional com Next.js, TypeScript, Zustand, TanStack Query e Axios.

## O que tem

- Cliente Axios em `src/data/services/api` com interceptors de requisição e resposta.
- Token de sessão em `src/data/services/api/token`, persistido no login, enviado como `Bearer` no interceptor e limpo no 401 e no logout.
- Service de posts em `src/modules/posts/data/services/posts`, com validação Zod da resposta em runtime.
- Service de autenticação em `src/modules/auth/data/services/auth`.
- Schemas Zod de login (entrada e resposta) e de posts em `src/modules/*/data/schemas`.
- Hook `usePostsQuery` com TanStack Query para listar posts da API pública.
- Mutation `useLoginMutation` que grava o usuário na store ao entrar.
- Store Zustand de usuário mockado em `src/data/states/zustand/user`, persistida no `localStorage` e reidratada no boot.
- Store Zustand de posts (`readIds` / `favoriteIds`) que muda a lista na hora: marcar lido, favoritar, filtrar (todos/não lidos/lidos) e buscar por título.
- Nome do usuário mostrado no header após entrar, com anúncio e foco para leitores de tela.

A API pública (JSONPlaceholder) não tem endpoint de autenticação, então, com `NEXT_PUBLIC_USE_MOCK_AUTH` habilitado (padrão), o `AuthService` devolve um usuário mock quando o `POST /auth/login` responde 404. Outros erros (rede, 500) e 404 de outras rotas são propagados em vez de simulados. O 401 e o logout limpam token e usuário. As ações de login usam dados simulados; não existe backend real.

## Rodar

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

`NEXT_PUBLIC_API_URL` é obrigatória e não tem valor padrão no código. Sem ela, toda requisição falha com a mensagem "NEXT_PUBLIC_API_URL não definida" e a lista de posts mostra erro. Como é variável `NEXT_PUBLIC_`, o Next embute o valor no build: mudou o `.env.local`, reinicie o `pnpm dev` ou rode o build de novo. `NEXT_PUBLIC_USE_MOCK_AUTH` liga o login simulado.

## Verificar

```bash
pnpm lint
pnpm test
pnpm build
```
