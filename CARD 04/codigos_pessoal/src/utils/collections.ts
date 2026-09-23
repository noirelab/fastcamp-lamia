import type { UserProps, UserRole, UserSummary } from "@/types";

export const sortBy = <T, K extends keyof T>(items: T[], key: K): T[] =>
  [...items].sort((a, b) => {
    if (a[key] === b[key]) return 0;
    return a[key] > b[key] ? 1 : -1;
  });

export const toSummary = (user: UserProps): UserSummary => ({
  id: user.id,
  name: user.name,
  role: user.role,
});

export const countByRole = (items: UserProps[]): Record<UserRole, number> => {
  const initial: Record<UserRole, number> = { admin: 0, editor: 0, viewer: 0 };

  return items.reduce((acc, user) => {
    acc[user.role] += 1;
    return acc;
  }, initial);
};
