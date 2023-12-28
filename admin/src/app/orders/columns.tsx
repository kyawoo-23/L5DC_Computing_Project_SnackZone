"use client";

import DetailsButton from "@/components/Buttons/DetailsButton";
import { ColumnDef } from "@tanstack/react-table";
import { CustomerOrder, Prisma } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<
  Prisma.CustomerOrderGetPayload<{
    include: {
      AssignedAdmin: true;
    };
  }>
>[] = [
  {
    accessorKey: "OrderCode",
    header: "Order code",
  },
  {
    accessorKey: "OrderStatus",
    header: "Status",
    cell: ({ row }) => {
      const cellValue = row.original;
      if (cellValue.OrderStatus === "Pending") {
        return <Badge variant='secondary'>{cellValue.OrderStatus}</Badge>;
      } else if (cellValue.OrderStatus === "Processing") {
        return <Badge className='bg-purple-600'>{cellValue.OrderStatus}</Badge>;
      } else if (cellValue.OrderStatus === "Completed") {
        return <Badge className='bg-green-600'>{cellValue.OrderStatus}</Badge>;
      } else if (cellValue.OrderStatus === "Cancelled") {
        return <Badge variant='destructive'>{cellValue.OrderStatus}</Badge>;
      }
    },
  },
  {
    accessorKey: "Customer.CustomerName",
    header: "Customer name",
  },
  {
    accessorKey: "AssignedAdmin.AdminName",
    header: "Assigned admin",
    cell: ({ row }) => {
      const cellValue = row.original;
      return cellValue.AssignedAdmin?.Name || "Not assigned";
    },
  },
  {
    accessorKey: "CustomerOrderId",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const cellValue = row.original;
      return <DetailsButton details={cellValue.CustomerOrderId} />;
    },
  },
];
