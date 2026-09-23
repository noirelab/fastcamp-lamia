import type { UserWithTimestamps } from "@/types";

export class UserRepository {
  constructor(private readonly items: UserWithTimestamps[]) {}

  all(): UserWithTimestamps[] {
    return [...this.items];
  }

  findById(id: string): UserWithTimestamps | undefined {
    return this.items.find((user) => user.id === id);
  }

  findByEmail(email: string): UserWithTimestamps | undefined {
    return this.items.find((user) => user.email === email);
  }

  add(user: UserWithTimestamps): UserWithTimestamps {
    this.items.push(user);
    return user;
  }

  update(id: string, patch: Partial<UserWithTimestamps>): UserWithTimestamps | undefined {
    const index = this.items.findIndex((user) => user.id === id);
    const current = this.items[index];

    if (!current) return undefined;

    const updated = { ...current, ...patch };
    this.items[index] = updated;

    return updated;
  }
}
