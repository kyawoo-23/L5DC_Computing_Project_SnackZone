import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import ClientAdminSelect from "./ClientAcceptForm";
import { DataTable } from "@/components/DataTable/data-table";
import { columns } from "./columns";
import Image from "next/image";
import ClientOrderCompleteForm from "./ClientOrderCompleteForm";

export default async function CustomerOrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.customerOrder.findUnique({
    where: { CustomerOrderId: params.id },
    include: {
      Customer: true,
      AssignedAdmin: true,
      DeliveryService: true,
      OrderProducts: {
        include: {
          Product: true,
        },
      },
    },
  });
  const admins = await prisma.admin.findMany({
    where: {
      IsActive: 1,
    },
  });
  const deliveryServices = await prisma.deliveryService.findMany({
    where: {
      IsActive: 1,
    },
  });

  return (
    <>
      {data && (
        <>
          <div className='px-4 py-2 rounded-md w-full border-2 border-white mb-6 grid grid-cols-4 gap-y-6'>
            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Order code</span>
              <span className='text-lg font-semibold text-white'>
                {data.OrderCode}
              </span>
            </div>
            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Order status</span>
              {data.OrderStatus === "Pending" && (
                <Badge className='w-fit' variant='secondary'>
                  {data.OrderStatus}
                </Badge>
              )}
              {data.OrderStatus === "Processing" && (
                <Badge className='bg-purple-600 w-fit'>
                  {data.OrderStatus}
                </Badge>
              )}
              {data.OrderStatus === "Completed" && (
                <Badge className='bg-green-600 w-fit'>{data.OrderStatus}</Badge>
              )}
              {data.OrderStatus === "Cancelled" && (
                <Badge className='w-fit' variant='destructive'>
                  {data.OrderStatus}
                </Badge>
              )}
            </div>
            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Customer name</span>
              <span className='text-lg font-semibold text-white'>
                {data.Customer.CustomerName}
              </span>
            </div>
            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Assigned admin</span>
              <div className='text-lg font-semibold text-white'>
                {data.AssignedAdmin?.Name
                  ? data.AssignedAdmin?.Name
                  : "Not Assigned"}
              </div>
            </div>

            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Prepaid</span>
              <span className='text-lg font-semibold text-white cursor-pointer'>
                <details>
                  <summary>{data.IsPrepaid === 1 ? "Yes" : "No"}</summary>
                  {data.IsPrepaid === 1 && data.PrepaidVoucherImage && (
                    <Image
                      src={data.PrepaidVoucherImage}
                      alt='prepaid voucher image'
                      width={400}
                      height={400}
                      className='w-[180px] h-[260px] object-cover rounded-md mt-2'
                    />
                  )}
                </details>
              </span>
            </div>
            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Delivery</span>
              <span className='text-lg font-semibold text-white'>
                {data.DeliveryService?.DeliveryServiceName
                  ? data.DeliveryService.DeliveryServiceName
                  : "Not Assigned"}
              </span>
            </div>
            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Address</span>
              <span className='text-lg font-semibold text-white'>
                {data.CustomerAddress}
              </span>
            </div>
            <div className='flex flex-col pb-2'>
              <span className='text-sm text-gray-100 mb-3'>Phone</span>
              <span className='text-lg font-semibold text-white'>
                {data.CustomerPhone}
              </span>
            </div>

            {(data.OrderStatus === "Completed" ||
              data.OrderStatus === "Processing") && (
              <div className='flex flex-col pb-2'>
                <span className='text-sm text-gray-100 mb-3'>
                  {data.OrderStatus === "Completed"
                    ? "Completed at"
                    : "Accepted at"}
                </span>
                <span className='text-lg font-semibold text-white'>
                  {data.OrderStatus === "Completed"
                    ? data.DeliveredAt?.toLocaleString()
                    : data.AcceptedAt?.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {data.OrderStatus === "Pending" && (
            <ClientAdminSelect
              orderId={data.CustomerOrderId}
              admins={admins}
              deliveryServices={deliveryServices}
            />
          )}

          <div className='mt-6'>
            <DataTable columns={columns} data={data.OrderProducts} />
          </div>

          <div className='flex justify-end gap-6 items-center mt-4'>
            {data.OrderStatus === "Processing" && (
              <ClientOrderCompleteForm id={data.CustomerOrderId} />
            )}
            <div className='bg-primary rounded px-6 text-white py-4'>
              Total price: <b>{data.TotalPrice}</b>
            </div>
          </div>
        </>
      )}
    </>
  );
}
