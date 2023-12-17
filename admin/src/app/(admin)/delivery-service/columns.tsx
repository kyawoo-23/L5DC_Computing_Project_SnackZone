"use client";

import Image from "next/image";
import DetailsButton from "@/components/Buttons/DetailsButton";
import { ColumnDef } from "@tanstack/react-table";
import { DeliveryService } from "@prisma/client";
import StatusPill from "@/components/Pill/StatusPill";

export const columns: ColumnDef<DeliveryService>[] = [
  {
    accessorKey: "DeliveryServiceName",
    header: "Name",
  },
  {
    accessorKey: "DeliveryServiceImage",
    header: "Image",
    id: "image",
    cell: ({ row }) => {
      const cellValue = row.original;
      return (
        <Image
          src={cellValue.DeliveryServiceImage || ""}
          alt={cellValue.DeliveryServiceName}
          height={40}
          width={40}
          className='rounded bg-zinc-300'
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
    accessorKey: "DeliveryServiceId",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const cellValue = row.original;
      return <DetailsButton details={cellValue.DeliveryServiceId} />;
    },
  },
];
