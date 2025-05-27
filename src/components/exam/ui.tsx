// src/components/exam/ui.tsx
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { examSchema } from "./schema";
import ExamTable from "./table";

export const metadata: Metadata = {
  title: "Exams",
  description: "A list of exams.",
};

async function getExams() {
  const exams = await prisma.exam.findMany({
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

  return examSchema.array().parse(exams);
}

export default async function ExamPage() {
  const exams = await getExams();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Exams</h2>
      <ExamTable data={exams} />
    </div>
  );
}
