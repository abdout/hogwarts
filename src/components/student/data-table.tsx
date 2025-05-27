// src/components/teacher/ui.tsx
import { Metadata } from "next";
import prisma from "@/lib/prisma"; // Adjusted import statement
import { teacherSchema } from "./schema";
import TeacherTable from "./table";

export const metadata: Metadata = {
  title: "Teachers",
  description: "A list of teachers.",
};

// Fetch data from Prisma
async function getTeachers() {
  const teachers = await prisma.teacher.findMany({
    include: {
      subjects: {
        select: {
          id: true,
          name: true,
        },
      },
      classes: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return teacherSchema.array().parse(teachers);
}

export default async function TeacherPage() {
  const teachers = await getTeachers();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Teachers</h2>
      <TeacherTable data={teachers} />
    </div>
  );
}
