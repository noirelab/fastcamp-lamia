export type UserRole = "admin" | "editor" | "viewer";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

// intersection: UserProps + campos de auditoria
export type UserWithTimestamps = UserProps & {
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  data: T | null;
  success: boolean;
  message: string;
};

export type UserSummary = Pick<UserProps, "id" | "name" | "role">;

export type UserPatch = Partial<Omit<UserProps, "id" | "email">>;
