"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { Result } from "./schema";
import { columns } from "./columns";

export default function ResultTable({ data }: { data: Result[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="title"
      searchPlaceholder="Search results..."
    />
  );
}
