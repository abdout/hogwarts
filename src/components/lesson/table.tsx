// src/components/lesson/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Lesson } from "./schema";
import { DataTableFacetedFilter } from "@/components/atom/table/data-table-faceted-filter";
import { Table as ReactTable } from "@tanstack/react-table"; // Import the Table type
const dayOptions = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
];

export default function LessonTable({ data }: { data: Lesson[] }) {
  const additionalFilters = (table: ReactTable<Lesson>) => ( // Add the type ReactTable<Lesson>
    <>
      {table.getColumn("day") && (
        <DataTableFacetedFilter
          column={table.getColumn("day")}
          title="Day"
          options={dayOptions}
        />
      )}
    </>
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="name"
      searchPlaceholder="Search lessons..."
      additionalFilters={additionalFilters}
    />
  );
}