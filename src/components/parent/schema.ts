import { z } from "zod";

export const parentSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().nullable(),
  phone: z.string(),
  address: z.string(),
  createdAt: z.date(),
  students: z.array(z.object({ id: z.string(), name: z.string() })),
});

export type Parent = z.infer<typeof parentSchema>;
