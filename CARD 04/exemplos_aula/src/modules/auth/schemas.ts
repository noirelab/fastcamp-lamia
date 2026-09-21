import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  role: z.enum(['admin', 'user']),
  password: z.string().min(6),
});

// z.infer: tipo sai do schema
export type UserInput = z.infer<typeof userSchema>;
