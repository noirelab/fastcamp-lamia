# F1 - Mini Blog

Miniblog de notícias sobre Fórmula 1 feito com Next.js, TypeScript e Tailwind. As notícias vêm da API de busca da Hacker News e podem ser filtradas e salvas nos favoritos.

## Rodar

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

## Variáveis de ambiente

- `HN_API_URL`: URL base da API da Hacker News (Algolia). Sem ela a home mostra a tela de erro.

## Login de demonstração

Não há backend de usuários: o login aceita só `piloto@f1blog.com` com a senha `senha123` e o cadastro apenas valida os campos.

## Verificar

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```
