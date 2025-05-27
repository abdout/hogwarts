import { z } from "zod";

export const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  teachers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type Subject = z.infer<typeof subjectSchema>;
