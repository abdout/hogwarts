import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ResultTable from "./table";
import { resultSchema } from "./schema";

export const metadata: Metadata = {
  title: "Results",
  description: "A list of results.",
};

async function getResults() {
  const results = await prisma.result.findMany({
    include: {
      student: { select: { name: true, surname: true } },
      exam: {
        include: {
          lesson: {
            select: {
              class: { select: { name: true } },
              teacher: { select: { name: true, surname: true } },
            },
          },
        },
      },
      assignment: {
        include: {
          lesson: {
            select: {
              class: { select: { name: true } },
              teacher: { select: { name: true, surname: true } },
            },
          },
        },
      },
    },
  });

  const parsedResults = results.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return resultSchema.array().parse(parsedResults.filter((res) => res !== null));
}

export default async function ResultPage() {
  const results = await getResults();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Results</h2>
      <ResultTable data={results} />
    </div>
  );
}
