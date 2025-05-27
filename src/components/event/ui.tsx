// src/components/event/ui.tsx
import { Metadata } from "next";
import  prisma from "@/lib/prisma";
import { eventSchema } from "./schema";
import EventTable from "./table";

export const metadata: Metadata = {
  title: "Events",
  description: "A list of events.",
};

async function getEvents() {
  const events = await prisma.event.findMany({
    include: {
      class: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return eventSchema.array().parse(events);
}

export default async function EventPage() {
  const events = await getEvents();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Events</h2>
      <EventTable data={events} />
    </div>
  );
}
