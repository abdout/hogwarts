// src/components/announcement/ui.tsx
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { announcementSchema } from "./schema";
import AnnouncementTable from "./table";

export const metadata: Metadata = {
  title: "Announcements",
  description: "A list of announcements.",
};

async function getAnnouncements() {
  const announcements = await prisma.announcement.findMany({
    include: {
      class: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return announcementSchema.array().parse(announcements);
}

export default async function AnnouncementPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
      <AnnouncementTable data={announcements} />
    </div>
  );
}
