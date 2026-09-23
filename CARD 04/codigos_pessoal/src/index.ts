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

// bodies como chegariam de uma request: texto, sem tipo nenhum
const validBody = '{"name":"Elisa Prado","email":"elisa@fastcamp.dev","role":"viewer"}';
const invalidBody = '{"name":"A","email":"invalido","role":"root"}';
const brokenBody = '{"name":"Elisa"';

console.log("Criação:", createUser(validBody));
console.log("E-mail duplicado:", createUser(validBody));
console.log("Campos inválidos:", createUser(invalidBody));
console.log("JSON quebrado:", createUser(brokenBody));

console.log("Atualização:", updateUser("u-03", '{"role":"editor","active":true}'));
console.log("Atualização inválida:", updateUser("u-03", '{"active":"sim"}'));
console.log("Atualização de id inexistente:", updateUser("u-99", '{"role":"admin"}'));
