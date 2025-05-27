// src/components/student/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Student } from "./schema";
import { DataTableFacetedFilter } from "@/components/atom/table/data-table-faceted-filter";
import { Table as ReactTableType } from "@tanstack/react-table";

const sexOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const bloodTypeOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

export default function StudentTable({ data }: { data: Student[] }) {
  const additionalFilters = (table: ReactTableType<Student>) => (
    <>
      {table.getColumn("sex") && (
        <DataTableFacetedFilter
          column={table.getColumn("sex")}
          title="Sex"
          options={sexOptions}
        
        />
      )}
      {table.getColumn("bloodType") && (
        <DataTableFacetedFilter
          column={table.getColumn("bloodType")}
          title="Blood Type"
          options={bloodTypeOptions}
         
        />
      )}
    </>
  );

  const initialColumnVisibility = {
    username: true,
    name: true,
    surname: true,
    email: true,
    phone: false,
    address: false,
    class: true,
    bloodType: false,
    sex: true,
    birthday: false,
    actions: true, // Ensure actions column is visible
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="name"
      searchPlaceholder="Filter students..."
      additionalFilters={additionalFilters}
      initialColumnVisibility={initialColumnVisibility}
    />
  );
}
