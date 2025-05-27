// src/components/class/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Class } from "./schema";
import { DataTableFacetedFilter } from "@/components/atom/table/data-table-faceted-filter";
import { Table } from "@tanstack/react-table";

const gradeOptions = [
  { label: "Grade 1", value: "1" },
  { label: "Grade 2", value: "2" },
  { label: "Grade 3", value: "3" },
];

export default function ClassTable({ data }: { data: Class[] }) {
  const additionalFilters = (table: Table<Class>) => (
    <>
      {table.getColumn("gradeId") && (
        <DataTableFacetedFilter
          column={table.getColumn("gradeId")}
          title="Grade"
          options={gradeOptions}
        />
      )}
    </>
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="name"
      searchPlaceholder="Filter by class name..."
      additionalFilters={additionalFilters}
    />
  );
}
