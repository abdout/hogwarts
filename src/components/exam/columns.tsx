// src/components/exam/columns.tsx
"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Exam } from "./schema";

export const columns: ColumnDef<Exam>[] = [
  getSelectionColumn<Exam>(),
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "Subject",
    cell: ({ row }: CellContext<Exam, unknown>) => (
      <div>{row.original.lesson.subject.name}</div>
    ),
  },
  {
    header: "Class",
    cell: ({ row }: CellContext<Exam, unknown>) => (
      <div>{row.original.lesson.class.name}</div>
    ),
  },
  {
    header: "Teacher",
    cell: ({ row }: CellContext<Exam, unknown>) => (
      <div>
        {row.original.lesson.teacher.name} {row.original.lesson.teacher.surname}
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }: CellContext<Exam, unknown>) => (
      <div>{new Date(row.getValue("startTime")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }: CellContext<Exam, unknown>) => (
      <div>{new Date(row.getValue("endTime")).toLocaleString()}</div>
    ),
  },
  getActionsColumn<Exam>({
    baseUrl: "/root/list/exams",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (exam) => {
      console.log("Edit exam:", exam);
      // Add your edit logic here
    },
    onDelete: (exam) => {
      console.log("Delete exam:", exam);
      // Add your delete logic here
    },
  }),
];
