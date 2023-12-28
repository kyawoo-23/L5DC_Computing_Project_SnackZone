import { DataTable } from "@/components/DataTable/data-table";
import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import React from "react";
import { columns } from "./columns";

const OrdersPage = async () => {
  const data = await prisma.customerOrder.findMany({
    include: {
      Customer: true,
      AssignedAdmin: true,
      DeliveryService: true,
    },
  });

  return (
    <div>
      <PageHeader title={`Orders for ${new Date().toDateString()}`} />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default OrdersPage;
