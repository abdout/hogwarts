// src/components/lesson/columns.tsx
"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Lesson } from "./schema";

export const columns: ColumnDef<Lesson>[] = [
  getSelectionColumn<Lesson>(),
  {
    accessorKey: "name",
    header: "Lesson Name",
  },
  {
    header: "Day",
    accessorKey: "day",
  },
  {
    header: "Subject",
    cell: ({ row }: CellContext<Lesson, unknown>) => (
      <div>{row.original.subject.name}</div>
    ),
  },
  {
    header: "Class",
    cell: ({ row }: CellContext<Lesson, unknown>) => (
      <div>{row.original.class.name}</div>
    ),
  },
  {
    header: "Teacher",
    cell: ({ row }: CellContext<Lesson, unknown>) => (
      <div>
        {row.original.teacher.name} {row.original.teacher.surname}
      </div>
    ),
  },
  {
    header: "Start Time",
    accessorKey: "startTime",
    cell: ({ row }: CellContext<Lesson, unknown>) => (
      <div>{new Date(row.getValue("startTime")).toLocaleTimeString()}</div>
    ),
  },
  {
    header: "End Time",
    accessorKey: "endTime",
    cell: ({ row }: CellContext<Lesson, unknown>) => (
      <div>{new Date(row.getValue("endTime")).toLocaleTimeString()}</div>
    ),
  },
  getActionsColumn<Lesson>({
    baseUrl: "/root/list/lessons",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (lesson) => {
      console.log("Edit lesson:", lesson);
      // Add your edit logic here
    },
    onDelete: (lesson) => {
      console.log("Delete lesson:", lesson);
      // Add your delete logic here
    },
  }),
];
