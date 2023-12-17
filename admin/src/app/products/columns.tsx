"use client";

import Image from "next/image";
import DetailsButton from "@/components/Buttons/DetailsButton";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Product } from "@prisma/client";
import StatusPill from "@/components/Pill/StatusPill";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "ProductName",
    header: "Name",
  },
  {
    accessorKey: "ProductImage",
    header: "Image",
    id: "image",
    cell: ({ row }) => {
      const cellValue = row.original;
      return (
        <Image
          src={cellValue.ProductPrimaryImage || ""}
          alt={cellValue.ProductName}
          height={40}
          width={40}
          className='rounded bg-zinc-300 w-10 h-10 object-cover'
        />
      );
    },
  },
  {
    accessorKey: "IsActive",
    header: "Status",
    id: "status",
    cell: ({ row }) => {
      const cellValue = row.original;
      return <StatusPill Value={cellValue} />;
    },
  },
  {
    accessorKey: "ProductId",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const cellValue = row.original;
      return <DetailsButton details={cellValue.ProductId} />;
    },
  },
  // {
  //   accessorKey: "id",
  //   header: "Action",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const cellValue = row.original;
  //     return <DetailsButton details={cellValue.id} />;
  //   },
  // },
];

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant='ghost'
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className='w-full justify-start hover:bg-white'
//         >
//           Email
//           {column.getIsSorted() === "asc" ? (
//             <ArrowDown className='ml-2 h-4 w-4' />
//           ) : (
//             <ArrowUp className='ml-2 h-4 w-4' />
//           )}
//         </Button>
//       );
//     },
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
//   {
//     accessorKey: "id",
//     header: "Action",
//     id: "actions",
//     cell: ({ row }) => {
//       const cellValue = row.original;
//       return <DetailsButton details={cellValue.id} />;
//     },
//   },
// ];
