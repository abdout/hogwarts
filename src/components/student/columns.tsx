// src/components/student/columns.tsx
"use client";

import { ColumnDef, CellContext, Row } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Student } from "./schema";

export const columns: ColumnDef<Student>[] = [
  getSelectionColumn<Student>(),
  ...generateColumns<Student>([
    {
      accessorKey: "username",
      header: "Student ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "surname",
      header: "Surname",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: CellContext<Student, unknown>) => (
        <div>{row.getValue("email") || "-"}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }: CellContext<Student, unknown>) => (
        <div>{row.getValue("phone") || "-"}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "class", // Access the nested object
      header: "Class",
      cell: ({ row }: CellContext<Student, unknown>) => (
        <div>{row.original.class.name}</div> // Explicitly access nested property
      ),
    },
    {
      accessorKey: "bloodType",
      header: "Blood Type",
    },
    {
      accessorKey: "sex",
      header: "Sex",
      filterFn: (row: Row<Student>, id: string, value: string[]) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "birthday",
      header: "Birthday",
      cell: ({ row }: CellContext<Student, unknown>) => (
        <div>{new Date(row.getValue("birthday")).toLocaleDateString()}</div>
      ),
    },
  ]),
  getActionsColumn<Student>({
    baseUrl: "/root/list/students",
    showView: true,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (student) => {
      console.log("Edit student:", student);
      // Add your edit logic here
    },
    onDelete: (student) => {
      console.log("Delete student:", student);
      // Add your delete logic here
    },
  }),
];
