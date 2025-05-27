// src/components/teacher/columns.tsx
"use client";

import { ColumnDef, CellContext, Row } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Teacher } from "./schema";

export const columns: ColumnDef<Teacher>[] = [
  getSelectionColumn<Teacher>(),
  ...generateColumns<Teacher>([
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: "Username",
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
      cell: ({ row }: CellContext<Teacher, unknown>) => (
        <div>{row.getValue("email") || "-"}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }: CellContext<Teacher, unknown>) => (
        <div>{row.getValue("phone") || "-"}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "bloodType",
      header: "Blood Type",
    },
    {
      accessorKey: "sex",
      header: "Sex",
      filterFn: (row: Row<Teacher>, id: string, value: string[]) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }: CellContext<Teacher, unknown>) => (
        <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "birthday",
      header: "Birthday",
      cell: ({ row }: CellContext<Teacher, unknown>) => (
        <div>{new Date(row.getValue("birthday")).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "subjects",
      header: "Subjects",
      cell: ({ row }: CellContext<Teacher, unknown>) => (
        <div>
          {row.original.subjects?.map((subject) => subject.name).join(", ") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "classes",
      header: "Classes",
      cell: ({ row }: CellContext<Teacher, unknown>) => (
        <div>{row.original.classes?.map((cls) => cls.name).join(", ") || "-"}</div>
      ),
    },
  ]),
  getActionsColumn<Teacher>({
    baseUrl: "/root/list/teachers",
    showView: true,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (teacher) => {
      console.log("Edit teacher:", teacher);
      // Add your edit logic here
    },
    onDelete: (teacher) => {
      console.log("Delete teacher:", teacher);
      // Add your delete logic here
    },
  }),
];