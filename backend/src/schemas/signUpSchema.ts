import { string, z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim(),
  email: z.string().email(),
  password: z.string().min(4).max(5),
});
