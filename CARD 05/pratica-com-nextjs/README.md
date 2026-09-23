# F1 - Mini Blog

Miniblog de notícias sobre Fórmula 1, feito para praticar Next.js, App Router, TypeScript e Tailwind CSS.

## Rodar

```bash
pnpm install
pnpm dev
```

## O que tem

- Rotas em `src/app`: home, rota dinâmica `/artigos/[slug]`, login e cadastro em `(auth)`, perfil em `(secure)`.
- Telas e componentes por domínio em `src/modules`; reutilizáveis em `src/shared/components`.
- Home e detalhe são Server Components: as notícias vêm da API do Hacker News (`fetchArticles` / `fetchArticleBySlug`), com `loading.tsx` e `error.tsx` para carregamento e erro.
- `generateStaticParams` pré-renderiza os slugs retornados pela API, com fallback vazio se a API não responder no build.
- `ArticleList` é Client Component: busca por título e favoritos persistidos no `localStorage`.
- Login, cadastro e perfil controlam o estado com `useState`.

As telas de login e perfil são demonstrações: não há autenticação real. Os dados do blog vêm de uma API pública.
