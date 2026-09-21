# F1 2021 - Mini Blog

Miniblog sobre a temporada 2021 da Fórmula 1, feito para praticar Next.js, App Router, TypeScript e Tailwind CSS.

## Rodar

```bash
pnpm install
pnpm dev
```

## O que tem

- Rotas em `src/app`: home, rota dinâmica `/artigos/[slug]`, login e cadastro em `(auth)`, perfil em `(secure)`.
- Telas e componentes por domínio em `src/modules`; reutilizáveis em `src/shared/components`.
- `ArticleList` é Client Component com `useState`, `useEffect` e `useRef`; as páginas são Server Components e delegam a interação.
- Login, cadastro e perfil controlam o estado com `useState`.

As telas de login e perfil são demonstrações: não há autenticação real nem backend.
