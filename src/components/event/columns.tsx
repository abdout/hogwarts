// src/components/event/columns.tsx
"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import {
  generateColumns,
  getSelectionColumn,
  getActionsColumn,
} from "@/components/atom/table/columns";
import { Event } from "./schema";

export const columns: ColumnDef<Event>[] = [
  getSelectionColumn<Event>(),
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "Class",
    cell: ({ row }: CellContext<Event, unknown>) => (
      <div>{row.original.class?.name || "-"}</div>
    ),
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }: CellContext<Event, unknown>) => (
      <div>{new Date(row.getValue("startTime")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }: CellContext<Event, unknown>) => (
      <div>{new Date(row.getValue("endTime")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: CellContext<Event, unknown>) => (
      <div>{row.getValue("description") || "-"}</div>
    ),
  },
  getActionsColumn<Event>({
    baseUrl: "/root/list/events",
    showView: false,
    showCopy: true,
    showEdit: true,
    showDelete: true,
    onEdit: (event) => {
      console.log("Edit event:", event);
      // Add your edit logic here
    },
    onDelete: (event) => {
      console.log("Delete event:", event);
      // Add your delete logic here
    },
  }),
];
