// interface: contrato de objeto
export interface UserProps {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// type: union e intersection
export type UserWithId = UserProps & { id: string };

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
