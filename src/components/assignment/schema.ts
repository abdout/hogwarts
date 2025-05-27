// src/components/assignment/schema.ts
import { z } from "zod";

export const assignmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  startDate: z.date(),
  dueDate: z.date(),
  lesson: z.object({
    subject: z.object({
      name: z.string(),
    }),
    class: z.object({
      name: z.string(),
    }),
    teacher: z.object({
      name: z.string(),
      surname: z.string(),
    }),
  }),
});

export type Assignment = z.infer<typeof assignmentSchema>;
