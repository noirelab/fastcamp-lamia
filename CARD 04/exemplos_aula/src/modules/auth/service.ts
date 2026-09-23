// path alias @/modules/...
import { userSchema, type UserInput } from '@/modules/auth/schemas';
import type { ApiResponse, UserProps } from '@/modules/auth/types';

// dado externo chega como unknown (ex.: body de request) e so vira UserInput depois do parse
const parseUserInput = (payload: unknown): UserInput => userSchema.parse(payload);

const createUser = (input: UserInput): UserProps => {
  return {
    name: input.name,
    email: input.email,
    role: input.role,
  };
};

const requestBody: unknown = {
  name: 'Kaique',
  email: 'kaique@email.com',
  role: 'admin',
  password: '123456',
};

const user = createUser(parseUserInput(requestBody));

const response: ApiResponse<UserProps> = {
  data: user,
  success: true,
  message: 'Usuário criado com sucesso',
};

console.log(response);
