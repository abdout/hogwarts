// src/components/class/columns.tsx
"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Class } from "./schema";

export const columns: ColumnDef<Class>[] = [
  getSelectionColumn<Class>(),
  ...generateColumns<Class>([
    {
      accessorKey: "name",
      header: "Class Name",
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
    },
    {
      accessorKey: "gradeId",
      header: "Grade",
    },
    {
      accessorKey: "supervisor",
      header: "Supervisor",
      cell: ({ row }: CellContext<Class, unknown>) => {
        const supervisor = row.original.supervisor;
        return (
          <div>
            {supervisor
              ? `${supervisor.name} ${supervisor.surname}`
              : "No Supervisor"}
          </div>
        );
      },
    },
  ]),
  getActionsColumn<Class>({
    baseUrl: "/root/list/classes",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    // onEdit: (class) => {
    //   console.log("Edit class:", class);
    //   // Add your edit logic here
    // },
    // onDelete: (class) => {
    //   console.log("Delete class:", class);
    //   // Add your delete logic here
    // },
  }),
];
