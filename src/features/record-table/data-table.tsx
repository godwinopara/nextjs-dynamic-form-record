"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import CalendarPopUp from "@/components/calendar-popup";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import ExportExcelButton from "@/components/export-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IRecords } from "@/types/record";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends IRecords, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const table = useReactTable({
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      globalFilter,
      columnFilters,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const fullName = row.getValue("fullName") as string;
      const phoneNumber = row.getValue("phoneNumber") as string;

      return (
        fullName.toLowerCase().includes(filterValue.toLowerCase()) ||
        phoneNumber.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  });

  useEffect(() => {
    table.getColumn("date")?.setFilterValue(dateRange);
  }, [dateRange, table]);

  return (
    <Card>
      {/* ============== FILTERS ============= */}
      <CardHeader>
        {/* Header with title, record count, and export button */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="mb-4 lg:mb-0">
            <CardTitle>Form Records</CardTitle>
            {/* Show filtered count vs total count */}
            <CardDescription>
              {table.getFilteredRowModel().rows.length} of {data.length} records
            </CardDescription>
          </div>
          <ExportExcelButton
            filteredRecords={table.getFilteredRowModel().rows.map((row) => row.original)}
          />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row items-center justify-between py-4">
          <Input
            placeholder="Filter FullName or Phone Number..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className=" py-5 px-4"
          />
          <CalendarPopUp onChange={setDateRange} />
        </div>
      </CardHeader>

      {/* ============ TANSTACK REACT TABLE =========== */}

      <CardContent>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* ========== PAGINATION ========== */}

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <FaArrowLeft />
            </Button>

            <div className="flex w-[100px] items-center justify-center text-sm font-semibold">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <FaArrowRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
