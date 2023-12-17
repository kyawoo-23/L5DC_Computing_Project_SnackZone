"use client";

import Image from "next/image";
import DetailsButton from "@/components/Buttons/DetailsButton";
import { ColumnDef } from "@tanstack/react-table";
import { Supplier } from "@prisma/client";

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "SupplierName",
    header: "Name",
  },
  {
    accessorKey: "SupplierImage",
    header: "Image",
    id: "image",
    cell: ({ row }) => {
      const cellValue = row.original;
      return (
        <Image
          src={cellValue.SupplierImage || ""}
          alt={cellValue.SupplierName}
          height={40}
          width={40}
          className='rounded bg-zinc-300 w-10 h-10 object-cover'
        />
      );
    },
  },
  {
    accessorKey: "SupplierId",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const cellValue = row.original;
      return <DetailsButton details={cellValue.SupplierId} />;
    },
  },
];
