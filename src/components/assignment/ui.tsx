// src/components/assignment/ui.tsx
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { assignmentSchema } from "./schema";
import AssignmentTable from "./table";

export const metadata: Metadata = {
  title: "Assignments",
  description: "A list of assignments.",
};

async function getAssignments() {
  const assignments = await prisma.assignment.findMany({
    include: {
      lesson: {
        select: {
          subject: { select: { name: true } },
          class: { select: { name: true } },
          teacher: { select: { name: true, surname: true } },
        },
      },
    },
  });
  return assignmentSchema.array().parse(assignments);
}

export default async function AssignmentPage() {
  const assignments = await getAssignments();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Assignments</h2>
      <AssignmentTable data={assignments} />
    </div>
  );
}
