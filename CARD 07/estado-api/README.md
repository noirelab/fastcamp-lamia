# Card 07 - Estado Global e API

Dashboard em Next.js que lista posts do JSONPlaceholder com TanStack Query e Axios. O usuário logado e os posts lidos e favoritos ficam em stores do Zustand, salvas no localStorage.

A API pública não tem login, então o login é simulado: só o 404 de `/auth/login` vira um usuário mock. Não existe backend real.

## Rodar

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Variáveis de ambiente:

- `NEXT_PUBLIC_API_URL`: endereço da API. Obrigatória, sem ela as requisições falham.
- `NEXT_PUBLIC_USE_MOCK_AUTH`: login simulado, ligado por padrão; só `false` desliga.

## Verificar

```bash
pnpm lint
pnpm format:check
pnpm test
pnpm build
```
