# Card 04: códigos pessoais

Um pequeno cadastro de usuários escrito do zero para praticar o card. Os dados de criação e atualização chegam como texto JSON, como viriam de uma request, e só viram tipo depois de passar pelo schema Zod; body quebrado ou com campo inválido é recusado com a mensagem do erro.

## Como rodar

```bash
pnpm install
pnpm typecheck
pnpm demo:users
```
