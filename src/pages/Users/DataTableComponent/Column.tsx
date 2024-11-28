"use client"

import { ColumnDef } from "@tanstack/react-table"
import RoleCell from "./TableCells/RoleCell";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    name:string,
    email: string,
    username:string,
    phoneNo:string,
    category:string,
    role:string,
    firstName:string,
    lastName:string
}

export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
            <span>{row.firstName+" "+row.lastName}</span>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "phoneNo",
      header: "Phone Number",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {

        return (
            <RoleCell row={row} key={row.id} />
        )
      },
    },
  ];