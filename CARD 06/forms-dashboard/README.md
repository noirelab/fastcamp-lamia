# Card 06 - Formulários e Dashboard de Fórmula 1

Dashboard da temporada 2021 de Fórmula 1 em Next.js, com login, cadastro e perfil validados com react-hook-form e Zod. O dashboard tem gráficos com recharts, filtro por equipe e um formulário que adiciona métricas ao painel. Sessão e métricas ficam em stores Zustand salvas no localStorage.

Não há backend: o "Atualizar dados" chama um fetch simulado que libera a próxima corrida da temporada a cada clique, e as contas cadastradas ficam só no navegador (não use senha real).

Conta de demonstração: `piloto@f1.com` / `senha123`.

## Rodar

```bash
pnpm install
pnpm dev
```

O projeto não usa variáveis de ambiente (ver `.env.example`).

## Verificar

```bash
pnpm lint
pnpm test
pnpm build
```
