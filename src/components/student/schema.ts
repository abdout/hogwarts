// src/components/student/schema.ts
import { z } from "zod";

export const studentSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string(),
  img: z.string().nullable(),
  bloodType: z.string(),
  sex: z.enum(["MALE", "FEMALE"]),
  createdAt: z.date(),
  birthday: z.date(),
  class: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type Student = z.infer<typeof studentSchema>;
