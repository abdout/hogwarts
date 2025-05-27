// src/components/exam/schema.ts
import { z } from "zod";

export const examSchema = z.object({
  id: z.number(),
  title: z.string(),
  startTime: z.date(),
  endTime: z.date(),
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

export type Exam = z.infer<typeof examSchema>;
