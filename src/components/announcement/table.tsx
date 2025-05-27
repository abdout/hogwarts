// src/components/announcement/table.tsx
"use client";

import { DataTable } from "@/components/atom/table/data-table";
import { columns } from "./columns";
import { Announcement } from "./schema";
import { DataTableFacetedFilter } from "@/components/atom/table/data-table-faceted-filter";
import { Table as ReactTableType } from "@tanstack/react-table";

const AnnouncementTable = ({ data }: { data: Announcement[] }) => {
  const additionalFilters = (table: ReactTableType<Announcement>) => (
    <>
      {table.getColumn("date") && (
        <DataTableFacetedFilter
          column={table.getColumn("date")}
          title="Date"
          options={[
            { label: "This Week", value: "thisWeek" },
            { label: "This Month", value: "thisMonth" },
          ]}
        />
      )}
    </>
  );

  const initialColumnVisibility = {
    title: true,
    class: true,
    date: true,
    actions: true, // Ensure actions column is visible
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      searchColumn="title"
      searchPlaceholder="Filter announcements..."
      additionalFilters={additionalFilters}
      initialColumnVisibility={initialColumnVisibility}
    />
  );
};

export default AnnouncementTable;
