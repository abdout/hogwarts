// src/components/atom/table/columns.tsx
"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

interface FieldDefinition<T> {
  accessorKey: Extract<keyof T, string>;
  header: string;
  cell?: (props: CellContext<T, unknown>) => JSX.Element;
  enableSorting?: boolean;
  enableHiding?: boolean;
  filterFn?: any;
}

interface GenerateColumnOptions {
  baseUrl: string;
  showView?: boolean;
  showCopy?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  onEdit?: (data: any) => void;
  onDelete?: (data: any) => void;
}

export function generateColumns<T>(fields: FieldDefinition<T>[]): ColumnDef<T>[] {
  return fields.map((field) => ({
    accessorKey: field.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={field.header} />
    ),
    cell: field.cell
      ? field.cell
      : ({ row }: CellContext<T, unknown>) => {
          const value = row.getValue(field.accessorKey);
          return <div>{value !== null && value !== undefined ? String(value) : "-"}</div>;
        },
    enableSorting: field.enableSorting ?? true,
    enableHiding: field.enableHiding ?? true,
    filterFn: field.filterFn,
  }));
}

export function getSelectionColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

export function getActionsColumn<T>(options: GenerateColumnOptions): ColumnDef<T> {
  return {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        baseUrl={options.baseUrl}
        showView={options.showView}
        showCopy={options.showCopy}
        showEdit={options.showEdit}
        showDelete={options.showDelete}
        onEdit={options.onEdit}
        onDelete={options.onDelete}
      />
    ),
  };
}