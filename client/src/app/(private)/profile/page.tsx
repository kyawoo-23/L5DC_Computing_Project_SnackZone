import { prisma } from "@/lib/prisma";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import ClientProfileDetails from "./ClientProfileDetails";

import ClientOrderHistory from "./ClientOrderHistory";

export default async function ProfilePage() {
  const token = getCookie("cus-token", { cookies }) as string;

  const data = await prisma.customer.findUnique({
    where: {
      CustomerId: token,
    },
  });

  const orders = await prisma.customerOrder.findMany({
    where: {
      CustomerId: token,
    },
    include: {
      DeliveryService: true,
      OrderProducts: {
        include: {
          Product: true,
        },
      },
    },
    orderBy: {
      OrderAt: "desc",
    },
  });

  return (
    <div>
      {data && (
        <>
          <ClientProfileDetails
            name={data.CustomerName}
            address={data.CustomerAddress}
            email={data.CustomerEmail}
            phone={data.CustomerPhone}
          />

          <h1 className='font-semibold text-lg'>Order History</h1>
          {orders.map((order) => (
            <ClientOrderHistory order={order} key={order.CustomerOrderId} />
          ))}
        </>
      )}
    </div>
  );
}
