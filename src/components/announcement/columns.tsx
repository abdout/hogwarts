// src/components/announcement/columns.tsx
"use client";

import { ColumnDef, CellContext, Row } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Announcement } from "./schema";

export const columns: ColumnDef<Announcement>[] = [
  getSelectionColumn<Announcement>(),
  ...generateColumns<Announcement>([
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "class",
      header: "Class",
      cell: ({ row }: CellContext<Announcement, unknown>) => (
        <div>{row.original.class?.name || "-"}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }: CellContext<Announcement, unknown>) => (
        <div>{new Date(row.getValue("date")).toLocaleDateString()}</div>
      ),
      filterFn: (row: Row<Announcement>, id: string, value: string[]) => {
        const date = new Date(row.getValue(id) as Date);
        if (value.includes("thisWeek")) {
          const today = new Date();
          const weekAgo = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 7
          );
          return date >= weekAgo && date <= today;
        }
        if (value.includes("thisMonth")) {
          const today = new Date();
          return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth()
          );
        }
        return false;
      },
    },
  ]),
  getActionsColumn<Announcement>({
    baseUrl: "/root/list/announcements",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (announcements) => {
      console.log("Edit announcements:", announcements);
      // Add your edit logic here
    },
    onDelete: (announcements) => {
      console.log("Delete announcements:", announcements);
      // Add your delete logic here
    },
  }),
];
