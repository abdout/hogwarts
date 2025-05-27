import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Copy, Edit, Trash, Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  // Base URL for the details page (e.g., "/dashboard/users", "/admin/products")
  baseUrl: string;
  // Optional custom ID field name if not using 'id'
  idField?: keyof TData;
  // Optional callbacks for actions
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
  // Optional flags to show/hide specific actions
  showView?: boolean;
  showCopy?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

export function DataTableRowActions<TData>({
  row,
  baseUrl,
  idField = 'id' as keyof TData,
  onEdit,
  onDelete,
  showView = true,
  showCopy = true,
  showEdit = true,
  showDelete = true,
}: DataTableRowActionsProps<TData>) {
  const data = row.original;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data));
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(data);
    } else {
      console.log("Edit action", data);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(data);
    } else {
      console.log("Delete action", data);
    }
  };

  // Construct the view details URL using the provided ID field
  const detailsUrl = `${baseUrl}/${data[idField]}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {showView && (
          <DropdownMenuItem asChild>
            <Link href={detailsUrl} className="flex items-center">
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              View
            </Link>
          </DropdownMenuItem>
        )}
        {showCopy && (
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Copy
          </DropdownMenuItem>
        )}
        {showEdit && (
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
        )}
        {showDelete && (
          <DropdownMenuItem onClick={handleDelete}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}