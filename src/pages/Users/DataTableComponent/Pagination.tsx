"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type PaginationDropdownProps = {
  totalPages: number; // Total number of pages
  options: number[]; // Page size options (e.g., [5, 10, 20])
  defaultPageSize?: number; // Default page size
  defaultPageNumber?: number; // Default page number
  onPageSizeChange: (size: number) => void; // Callback for page size change
  onPageNumberChange: (page: number) => void; // Callback for page number change
};

export const PaginationDropdown = ({
  totalPages,
  options,
  defaultPageSize = 10,
  defaultPageNumber = 1,
  onPageSizeChange,
  onPageNumberChange,
}: PaginationDropdownProps) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pageNumber, setPageNumber] = useState(defaultPageNumber);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    onPageSizeChange(size);
  };

  const handlePageNumberChange = (page: number) => {
    setPageNumber(page);
    onPageNumberChange(page);
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Page Number Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Page: {pageNumber}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <DropdownMenuItem key={page} onClick={() => handlePageNumberChange(page)}>
              {page}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Page Size Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Page Size: {pageSize}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((size) => (
            <DropdownMenuItem key={size} onClick={() => handlePageSizeChange(size)}>
              {size}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
