import { z } from 'zod';

export const formSchemaRegister = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6)
});

export const formSchemaSignin = formSchemaRegister.pick({
  email: true,
  password: true
});
