import { z } from "zod";

export const resultSchema = z.object({
  id: z.number(),
  title: z.string(),
  studentName: z.string(),
  studentSurname: z.string(),
  teacherName: z.string(),
  teacherSurname: z.string(),
  score: z.number(),
  className: z.string(),
  startTime: z.date(),
});

export type Result = z.infer<typeof resultSchema>;
