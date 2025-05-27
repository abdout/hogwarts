// src/components/class/schema.ts
import { z } from "zod";

export const classSchema = z.object({
  id: z.number(),
  name: z.string(),
  capacity: z.number(),
  gradeId: z.number(),
  supervisor: z
    .object({
      name: z.string(),
      surname: z.string(),
    })
    .nullable(),
});

export type Class = z.infer<typeof classSchema>;
