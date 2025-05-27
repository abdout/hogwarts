// src/components/student/ui.tsx
import { Metadata } from "next";
import prisma from "@/lib/prisma"; // Ensure prisma is correctly exported
import { studentSchema } from "./schema";
import StudentTable from "./table";

export const metadata: Metadata = {
  title: "Students",
  description: "A list of students.",
};

async function getStudents() {
  const students = await prisma.student.findMany({
    include: {
      class: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return studentSchema.array().parse(students);
}

export default async function StudentPage() {
  const students = await getStudents();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Students</h2>
      <StudentTable data={students} />
    </div>
  );
}
