"use client";

import Image from "next/image";
import DetailsButton from "@/components/Buttons/DetailsButton";
import { ColumnDef } from "@tanstack/react-table";
import { Prisma } from "@prisma/client";
import StatusPill from "@/components/Pill/StatusPill";

export const columns: ColumnDef<
  Prisma.AdminGetPayload<{
    include: {
      AdminRole: true;
    };
  }>
>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "AdminRole.AdminRoleName",
    header: "Role",
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
    accessorKey: "AdminId",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const cellValue = row.original;
      return <DetailsButton details={cellValue.AdminId} />;
    },
  },
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
