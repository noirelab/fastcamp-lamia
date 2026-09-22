# Card 06 - Formulários e Dashboard de Fórmula 1

Mini-dashboard da temporada 2021 de Fórmula 1, feito com Next.js, TypeScript e Tailwind CSS.

## O que tem

- Home em `/`.
- Login em `/login` e cadastro em `/cadastro`, com validação tipada.
- Schemas Zod em `src/modules/auth/schemas.ts` (`loginSchema` e `registerSchema`).
- `react-hook-form` integrado com `zodResolver` nos dois formulários.
- Mensagens de erro visíveis e acessíveis abaixo de cada campo.
- Estados de carregamento e botões desabilitados durante o submit.
- Dashboard em `/dashboard` com dados mockados da temporada e atualização simulada.
- Perfil em `/perfil`.

As ações de login, cadastro e atualização do dashboard são simulações locais; não existe backend ou autenticação real.

## Rodar

```bash
pnpm install
pnpm dev
```

## Verificar

```bash
pnpm lint
pnpm build
pnpm test
```
