import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(5),
  password: z.string().min(5),
})
