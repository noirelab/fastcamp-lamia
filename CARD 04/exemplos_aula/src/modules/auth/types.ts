// interface: contrato de objeto
export interface UserProps {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
