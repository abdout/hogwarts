import { Metadata } from "next";
import prisma from "@/lib/prisma";
import SubjectTable from "./table";
import { subjectSchema } from "./schema";

export const metadata: Metadata = {
  title: "Subjects",
  description: "A list of all subjects.",
};

async function getSubjects() {
  const subjects = await prisma.subject.findMany({
    include: {
      teachers: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return subjectSchema.array().parse(subjects);
}

export default async function SubjectPage() {
  const subjects = await getSubjects();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Subjects</h2>
      <SubjectTable data={subjects} />
    </div>
  );
}
