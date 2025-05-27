// src/components/class/ui.tsx
import { Metadata } from "next";
import  prisma  from "@/lib/prisma";
import { classSchema } from "./schema";
import ClassTable from "./table";

export const metadata: Metadata = {
  title: "Classes",
  description: "A list of classes.",
};

async function getClasses() {
  const classes = await prisma.class.findMany({
    include: {
      supervisor: true,
    },
  });
  return classSchema.array().parse(classes);
}

export default async function ClassPage() {
  const classes = await getClasses();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Classes</h2>
      <ClassTable data={classes} />
    </div>
  );
}
