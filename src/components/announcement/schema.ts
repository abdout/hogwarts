// src/components/announcement/schema.ts
import { z } from "zod";

export const announcementSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  class: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(), // Class may be null for announcements not tied to a class
});

export type Announcement = z.infer<typeof announcementSchema>;
