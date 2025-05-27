"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Result } from "./schema";

export const columns: ColumnDef<Result>[] = [
  getSelectionColumn<Result>(),
  ...generateColumns<Result>([
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "studentName",
      header: "Student",
      cell: ({ row }: CellContext<Result, unknown>) => (
        <div>
          {row.getValue("studentName")} {row.original.studentSurname}
        </div>
      ),
    },
    {
      accessorKey: "score",
      header: "Score",
    },
    {
      accessorKey: "teacherName",
      header: "Teacher",
      cell: ({ row }: CellContext<Result, unknown>) => (
        <div>
          {row.getValue("teacherName")} {row.original.teacherSurname}
        </div>
      ),
    },
    {
      accessorKey: "className",
      header: "Class",
    },
    {
      accessorKey: "startTime",
      header: "Date",
      cell: ({ row }: CellContext<Result, unknown>) => (
        <div>{new Date(row.getValue("startTime")).toLocaleDateString()}</div>
      ),
    },
  ]),
  getActionsColumn<Result>({
    baseUrl: "/root/list/results",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (result) => {
      console.log("Edit result:", result);
      // Add your edit logic here
    },
    onDelete: (result) => {
      console.log("Delete result:", result);
      // Add your delete logic here
    },
  }),
];
