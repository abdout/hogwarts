// src/components/event/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Event } from "./schema";
import { DataTableFacetedFilter } from "@/components/atom/table/data-table-faceted-filter";

export default function EventTable({ data }: { data: Event[] }) {
  const additionalFilters = (table: any) => (
    <>
      {table.getColumn("class.name") && (
        <DataTableFacetedFilter
          column={table.getColumn("class.name")}
          title="Class"
          options={data
            .filter((event) => event.class)
            .map((event) => ({
              label: event.class!.name,
              value: event.class!.id.toString(),
            }))}
        />
      )}
    </>
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="title"
      searchPlaceholder="Filter events..."
      additionalFilters={additionalFilters}
    />
  );
}
