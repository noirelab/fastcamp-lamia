import { users } from "@/data/users";
import { parseCreateUser, updateUserSchema } from "@/schemas";
import { countByRole, sortBy, toSummary } from "@/utils/collections";
import type { ApiResponse, UserRole, UserSummary, UserWithTimestamps } from "@/types";
import { UserRepository } from "@/services/userRepository";

const repository = new UserRepository(users);

export const listUsers = (): UserWithTimestamps[] => sortBy(repository.all(), "name");

export const listSummaries = (): UserSummary[] => listUsers().map(toSummary);

export const rolesSummary = (): Record<UserRole, number> => countByRole(repository.all());

export const findUserById = (id: string): UserWithTimestamps | undefined =>
  repository.findById(id);

export const createUser = (payload: unknown): ApiResponse<UserWithTimestamps> => {
  const input = parseCreateUser(payload);

  if (repository.findByEmail(input.email)) {
    return { data: null, success: false, message: "E-mail já cadastrado." };
  }

  const now = new Date().toISOString();
  const nextNumber = repository.all().length + 1;
  const id = `u-${nextNumber < 10 ? `0${nextNumber}` : nextNumber}`;

  const user = repository.add({
    id,
    name: input.name,
    email: input.email,
    role: input.role,
    active: true,
    createdAt: now,
    updatedAt: now,
  });

  return { data: user, success: true, message: "Usuário criado com sucesso." };
};

export const updateUser = (
  id: string,
  payload: unknown,
): ApiResponse<UserWithTimestamps> => {
  const patch = updateUserSchema.parse(payload);

  const updated = repository.update(id, {
    ...patch,
    updatedAt: new Date().toISOString(),
  });

  if (!updated) {
    return { data: null, success: false, message: "Usuário não encontrado." };
  }

  return { data: updated, success: true, message: "Usuário atualizado com sucesso." };
};
