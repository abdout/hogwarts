// src/components/exam/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Exam } from "./schema";

export default function ExamTable({ data }: { data: Exam[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="title"
      searchPlaceholder="Filter exams..."
    />
  );
}
