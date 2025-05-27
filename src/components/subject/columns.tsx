"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Subject } from "./schema";

export const columns: ColumnDef<Subject>[] = [
  getSelectionColumn<Subject>(),
  ...generateColumns<Subject>([
    {
      accessorKey: "name",
      header: "Subject Name",
    },
    {
      accessorKey: "teachers",
      header: "Teachers",
      cell: ({ row }: CellContext<Subject, unknown>) => {
        const teachers = row.getValue("teachers") as Subject["teachers"]; // Explicit cast
        return (
          <div>
            {teachers.map((teacher) => teacher.name).join(", ")}
          </div>
        );
      },
    },
      
  ]),
  getActionsColumn<Subject>({
    baseUrl: "/root/list/subjects",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (subject) => {
      console.log("Edit subject:", subject);
      // Add your edit logic here
    },
    onDelete: (subject) => {
      console.log("Delete subject:", subject);
      // Add your delete logic here
    },
  }),
];
