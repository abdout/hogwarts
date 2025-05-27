// src/components/teacher/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Teacher } from "./schema";
import { DataTableFacetedFilter } from "@/components/atom/table/data-table-faceted-filter";
import { Table as ReactTable, VisibilityState } from "@tanstack/react-table";

const sexOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

export default function TeacherTable({ data }: { data: Teacher[] }) {
  const initialColumnVisibility: VisibilityState = {
    id: false,
    username: false,
    surname: false,
    email: true,
    phone: true,
    address: false,
    bloodType: false,
    sex: false,
    createdAt: false,
    birthday: false,
    subjects: true,
    classes: true,
    actions: true, // Ensure actions column is visible
  };
  const additionalFilters = (table: ReactTable<Teacher>) => (
    <>
      {table.getColumn("sex") && (
        <DataTableFacetedFilter
          column={table.getColumn("sex")}
          title="Sex"
          options={sexOptions}
        />
      )}
    </>
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="name"
      searchPlaceholder="Filter teachers..."
      additionalFilters={additionalFilters}
      initialColumnVisibility={initialColumnVisibility}
    />
  );
}
