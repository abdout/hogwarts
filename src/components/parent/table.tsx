"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { Parent } from "./schema";
import { columns } from "./columns";

export default function ParentTable({ data }: { data: Parent[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="name"
      searchPlaceholder="Search parents..."
    />
  );
}
