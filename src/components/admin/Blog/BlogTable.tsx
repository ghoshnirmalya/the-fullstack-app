"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/tailwind-utils";
import { Blog } from "@prisma/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const tableVariants = cva(
  "border bg-white [&>tbody>*:not(:first-child)]:border-t-[1px] text-sm",
  {
    variants: {
      size: {
        sm: "[&_th]:p-3",
        md: "[&_td]:p-3 [&_th]:p-3",
        lg: "[&_td]:p-5 [&_th]:p-7",
        xl: "[&_td]:p-7 [&_th]:p-9",
      },
      striped: {
        true: "[&>tbody>*:nth-child(odd)]:bg-ring",
        false: "",
      },
      fullWidth: {
        false: "",
        true: "w-full",
      },
      hover: {
        true: "[&>tbody>*:hover]:bg-gray-50 [&>tbody>*:hover]:text-primary",
        false: "",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
      },
      rounded: {
        true: "overflow-hidden rounded-lg",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      striped: false,
      fullWidth: true,
      hover: true,
      shadow: "sm",
      rounded: true,
    },
  }
);

interface BlogTableProps {
  blogs: Blog[];
  size?: "sm" | "md" | "lg" | "xl";
  striped?: boolean;
  fullWidth?: boolean;
  hover?: boolean;
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  rounded?: boolean;
}

export const BlogTable = ({
  blogs,
  size,
  striped,
  fullWidth,
  hover,
  shadow = "none",
  rounded,
}: BlogTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const columns = useMemo<ColumnDef<Blog>[]>(
    () => [
      {
        accessorKey: "title",
        cell: (info) => info.getValue(),
        header: () => "Title",
      },
      {
        accessorKey: "createdAt",
        cell: (info) => info.getValue(),
        header: () => "Created at",
      },
    ],
    []
  );

  const table = useReactTable({
    data: blogs,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card>
      <table
        className={cn(
          tableVariants({ size, striped, fullWidth, hover, shadow, rounded })
        )}
      >
        <thead className={cn("bg-gray-50 border-b")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn("text-left")}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center space-x-4"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowUpNarrowWide className="h-4 2-4 block" />,
                          desc: (
                            <ArrowDownNarrowWide className="h-4 2-4 block" />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/admin/blogs/${row.original.id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </Card>
  );
};
