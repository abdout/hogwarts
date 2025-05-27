"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { Subject } from "./schema";
import { columns } from "./columns";

export default function SubjectTable({ data }: { data: Subject[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="name"
      searchPlaceholder="Search subjects..."
    />
  );
}
