// src/components/lesson/schema.ts
import { z } from "zod";

export const lessonSchema = z.object({
  id: z.number(),
  name: z.string(),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]),
  startTime: z.date(),
  endTime: z.date(),
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
});

export type Lesson = z.infer<typeof lessonSchema>;
