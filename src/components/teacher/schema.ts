// src/components/atom/table/schema-teacher.ts
import { z } from "zod";

export const teacherSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  address: z.string(),
  img: z.string().nullable(),
  bloodType: z.string(),
  sex: z.enum(["MALE", "FEMALE"]),
  createdAt: z.date(),
  birthday: z.date(),
  subjects: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  classes: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type Teacher = z.infer<typeof teacherSchema>;
