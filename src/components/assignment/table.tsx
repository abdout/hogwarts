// src/components/assignment/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Assignment } from "./schema";

const AssignmentTable = ({ data }: { data: Assignment[] }) => {
  const initialColumnVisibility = {
    "lesson.subject.name": true,
    "lesson.class.name": true,
    "lesson.teacher": true,
    dueDate: true,
    actions: true, // Ensure actions column is visible
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="lesson.subject.name"
      searchPlaceholder="Filter by subject name..."
      initialColumnVisibility={initialColumnVisibility}
    />
  );
};

export default AssignmentTable;
