import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ParentTable from "./table";
import { parentSchema } from "./schema";

export const metadata: Metadata = {
  title: "Parents",
  description: "A list of parents.",
};

// Fetch data from Prisma
async function getParents() {
  const parents = await prisma.parent.findMany({
    include: {
      students: {
        select: { id: true, name: true },
      },
    },
  });

  return parentSchema.array().parse(parents);
}

export default async function ParentPage() {
  const parents = await getParents();

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold tracking-tight">Parents</h2>
      <ParentTable data={parents} />
    </div>
  );
}
