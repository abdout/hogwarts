// src/components/event/schema.ts
import { z } from "zod";

export const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  startTime: z.date(),
  endTime: z.date(),
  class: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),
});

export type Event = z.infer<typeof eventSchema>;
