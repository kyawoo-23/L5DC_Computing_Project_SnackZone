"use client";

import Image from "next/image";
import DetailsButton from "@/components/Buttons/DetailsButton";
import { ColumnDef } from "@tanstack/react-table";
import { Variant } from "@prisma/client";

export const columns: ColumnDef<Variant>[] = [
  {
    accessorKey: "VariantName",
    header: "Name",
  },
  {
    accessorKey: "VariantColor",
    id: "color",
    cell: ({ row }) => {
      const cellValue = row.original;
      return (
        <div className='flex items-center'>
          <div
            className='w-4 h-4 rounded mr-2'
            style={{ backgroundColor: cellValue.VariantColor }}
          ></div>
          {cellValue.VariantColor}
        </div>
      );
    },
  },
  {
    accessorKey: "VariantId",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const cellValue = row.original;
      return <DetailsButton details={cellValue.VariantId} />;
    },
  },
];
