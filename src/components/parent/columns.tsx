"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Parent } from "./schema";

export const columns: ColumnDef<Parent>[] = [
  getSelectionColumn<Parent>(),
  ...generateColumns<Parent>([
    {
      accessorKey: "name",
      header: "Parent Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: CellContext<Parent, unknown>) => (
        <div>{row.getValue("email") || "-"}</div>
      ),
    },
    {
      accessorKey: "students",
      header: "Student Names",
      cell: ({ row }: CellContext<Parent, unknown>) => (
        <div>{row.original.students.map((student) => student.name).join(", ")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }: CellContext<Parent, unknown>) => (
        <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
      ),
    },
  ]),
  getActionsColumn<Parent>({
    baseUrl: "/root/list/parents",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (parent) => {
      console.log("Edit parent:", parent);
      // Add your edit logic here
    },
    onDelete: (student) => {
      console.log("Delete parent:", parent);
      // Add your delete logic here
    },
  }),
];
