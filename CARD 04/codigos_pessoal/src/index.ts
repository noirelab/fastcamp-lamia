import { createUserSchema } from "@/schemas";
import {
  createUser,
  findUserById,
  listSummaries,
  rolesSummary,
  updateUser,
} from "@/services/userService";

console.log("Usuários cadastrados:");
console.table(listSummaries());

console.log("Usuários por papel:", rolesSummary());

console.log("Busca por id:", findUserById("u-02"));

console.log(
  "Criação:",
  createUser({ name: "Elisa Prado", email: "elisa@fastcamp.dev", role: "viewer" }),
);

console.log(
  "E-mail duplicado:",
  createUser({ name: "Elisa Prado", email: "elisa@fastcamp.dev", role: "viewer" }),
);

console.log("Atualização:", updateUser("u-03", { role: "editor", active: true }));
console.log("Atualização de id inexistente:", updateUser("u-99", { role: "admin" }));

const invalidInput = createUserSchema.safeParse({
  name: "A",
  email: "invalido",
  role: "viewer",
});

console.log(
  "Validação barra dado inválido:",
  !invalidInput.success && invalidInput.error.issues[0].message,
);
