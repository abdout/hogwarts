// src/components/lesson/ui.tsx
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { lessonSchema } from "./schema";
import LessonTable from "./table";

export const metadata: Metadata = {
  title: "Lessons",
  description: "List of all lessons.",
};

// Fetch data from Prisma
async function getLessons() {
  const lessons = await prisma.lesson.findMany({
    include: {
      subject: { select: { name: true } },
      class: { select: { name: true } },
      teacher: { select: { name: true, surname: true } },
    },
  });

  return lessonSchema.array().parse(lessons);
}

export default async function LessonPage() {
  const lessons = await getLessons();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Lessons</h2>
      <LessonTable data={lessons} />
    </div>
  );
}
