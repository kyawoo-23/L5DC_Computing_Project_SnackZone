"use client";

import Image from "next/image";
import DetailsButton from "@/components/Buttons/DetailsButton";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Prisma } from "@prisma/client";
import StatusPill from "@/components/Pill/StatusPill";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<
  Prisma.PurchaseProductGetPayload<{
    include: {
      Product: true;
      ProductVariant: {
        include: {
          Variant: true;
        };
      };
      PurchasedBy: true;
    };
  }>
>[] = [
  {
    accessorKey: "PurchaseAt",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='w-full justify-start hover:bg-white font-bold'
        >
          Purchased At
          {column.getIsSorted() === "asc" ? (
            <ArrowDown className='ml-2 h-4 w-4' />
          ) : (
            <ArrowUp className='ml-2 h-4 w-4' />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const cellValue = row.original;
      return new Date(cellValue.PurchaseAt).toLocaleString();
    },
  },
  {
    accessorKey: "Product.PurchaseProductImage",
    header: "Image",
    id: "image",
    cell: ({ row }) => {
      const cellValue = row.original;
      return (
        <Image
          src={cellValue.Product.ProductPrimaryImage || ""}
          alt={cellValue.Product.ProductName}
          height={40}
          width={40}
          className='rounded bg-zinc-300 w-10 h-10 object-cover'
        />
      );
    },
  },
  {
    accessorKey: "Product.ProductName",
    header: "Name",
  },
  {
    accessorKey: "ProductVariant.Variant.VariantName",
    header: "Variant",
  },
  {
    accessorKey: "OriginalPrice",
    header: "Price",
  },
  {
    accessorKey: "PurchaseQuantity",
    header: "Quantity",
  },
  {
    header: "Total Price",
    id: "totalPrice",
    cell: ({ row }) => {
      const cellValue = row.original;
      return cellValue.OriginalPrice * cellValue.PurchaseQuantity;
    },
  },
  {
    accessorKey: "PurchasedBy.Name",
    header: "Purchased By",
  },
];
