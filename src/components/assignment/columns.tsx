// src/components/assignment/columns.tsx
"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Assignment } from "./schema";

export const columns: ColumnDef<Assignment>[] = [
  getSelectionColumn<Assignment>(),
  ...generateColumns<Assignment>([
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "lesson",
      header: "Subject Name",
      cell: ({ row }: CellContext<Assignment, unknown>) => (
        <div>{row.original.lesson.subject.name}</div>
      ),
    },
    {
      accessorKey: "lesson",
      header: "Class",
      cell: ({ row }: CellContext<Assignment, unknown>) => (
        <div>{row.original.lesson.class.name}</div>
      ),
    },
    {
      accessorKey: "lesson",
      header: "Teacher",
      cell: ({ row }: CellContext<Assignment, unknown>) => (
        <div>
          {row.original.lesson.teacher.name} {row.original.lesson.teacher.surname}
        </div>
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }: CellContext<Assignment, unknown>) => (
        <div>{new Date(row.getValue("dueDate")).toLocaleDateString()}</div>
      ),
    },
  ]),
  getActionsColumn<Assignment>({
    baseUrl: "/root/list/assignments",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (assignment) => {
      console.log("Edit assignment:", assignment);
      // Add your edit logic here
    },
    onDelete: (assignment) => {
      console.log("Delete assignment:", assignment);
      // Add your delete logic here
    },
  }),
];
