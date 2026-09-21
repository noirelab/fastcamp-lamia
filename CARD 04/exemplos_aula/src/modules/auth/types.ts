// Interface: contrato de objeto (props de componentes, services)
export interface UserProps {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Type: unions, intersections e tipos utilitários
export type UserWithId = UserProps & { id: string };

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
