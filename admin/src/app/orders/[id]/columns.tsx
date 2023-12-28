"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Prisma } from "@prisma/client";
import Image from "next/image";

export const columns: ColumnDef<
  Prisma.OrderProductGetPayload<{
    include: {
      Product: true;
    };
  }>
>[] = [
  {
    accessorKey: "Product.ProductPrimaryImage",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.Product?.ProductPrimaryImage || ""}
          alt={row.original.Product!.ProductName}
          height={40}
          width={40}
          className='rounded bg-zinc-300 w-10 h-10 object-cover'
        />
      );
    },
  },
  {
    accessorKey: "Product.ProductName",
    header: "Product name",
  },
  {
    accessorKey: "PurchaseType",
    header: "Purchase type",
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.PurchaseType === "retail"
            ? row.original.Quantity
            : row.original.Quantity +
              " * " +
              row.original.Product.ProductPackingQuantity}
        </span>
      );
    },
  },
  {
    accessorKey: "Price",
    header: "Unit Price",
    id: "UnitPrice",
    cell: ({ row }) => {
      return row.original.Price;
    },
  },
  {
    accessorKey: "TotalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      return row.original.PurchaseType === "retail"
        ? row.original.Price * row.original.Quantity
        : row.original.Price *
            row.original.Quantity *
            row.original.Product.ProductPackingQuantity;
    },
  },
];
