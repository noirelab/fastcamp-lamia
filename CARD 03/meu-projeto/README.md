# FastCamp LAMIA

Projeto base do FastCamp. É a partir daqui que os próximos cards são feitos.

## Stack

- Next.js 16 (App Router)
- TypeScript com `strict`
- Tailwind CSS
- ESLint e Prettier
- Husky + commitlint (Conventional Commits)
- pnpm

## Rodando o projeto

Precisa de Node 20+ e pnpm.

```bash
git clone https://github.com/noirelab/fastcamp-lamia.git
cd fastcamp-lamia
pnpm install
cp .env.example .env.local
pnpm dev
```

O app sobe em http://localhost:3000.

Outros comandos:

```bash
pnpm build    # build de produção
pnpm start    # roda o build
pnpm lint     # ESLint (sem saída = sem problemas)
pnpm format   # formata o código com Prettier
```

## Variáveis de ambiente

Estão no `.env.example`. Por enquanto só uma:

- `NEXT_PUBLIC_API_URL` — URL base da API, ex. `http://localhost:8000/api/v1/`

## Organização das pastas

```
src/
├── app/        rotas e layouts
├── modules/    funcionalidades de domínio
├── shared/     components, hooks, types e utils reaproveitados
└── data/       services/api e states
```

## Branches e commits

`main` é a branch estável e só recebe código via PR aprovada. O desenvolvimento
acontece na `develop`, e cada tarefa sai de uma branch `feature/<nome>`.

Os commits seguem o padrão Conventional Commits (`feat:`, `fix:`, `chore:`,
`docs:`, `refactor:`...). O commitlint roda no hook de commit e reprova mensagem
fora do padrão.
