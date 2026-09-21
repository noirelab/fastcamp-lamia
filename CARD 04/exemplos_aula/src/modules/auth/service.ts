// Path alias: @/modules/... em vez de ../../../modules/...
import { userSchema, type UserInput } from '@/modules/auth/schemas';
import type { ApiResponse, UserProps } from '@/modules/auth/types';

const createUser = (input: UserInput): UserProps => {
  const parsed = userSchema.parse(input);

  return {
    name: parsed.name,
    email: parsed.email,
    role: parsed.role,
  };
};

const user = createUser({
  name: 'Kaique',
  email: 'kaique@email.com',
  role: 'admin',
  password: '123456',
});

const response: ApiResponse<UserProps> = {
  data: user,
  success: true,
  message: 'Usuário criado com sucesso',
};

console.log(response);
