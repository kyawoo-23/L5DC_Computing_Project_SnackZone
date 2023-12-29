"use client";

import { Prisma } from "@prisma/client";
import { Image } from "@nextui-org/react";

type ClientOrderHistoryProps = {
  order: Prisma.CustomerOrderGetPayload<{
    include: {
      OrderProducts: {
        include: {
          Product: true;
        };
      };
    };
  }>;
};
export default function ClientOrderHistory({ order }: ClientOrderHistoryProps) {
  return (
    <>
      <div className='flex flex-col space-y-3 my-4'>
        <div className='flex items-start justify-between'>
          <p className='text-sm'>
            Order ID: <span className='font-semibold'>{order.OrderCode}</span>
            <br />
            <span>
              <span className='text-sm'>Status: </span>
              <span
                className='font-semibold px-2 rounded-full text-xs'
                style={{
                  backgroundColor:
                    order.OrderStatus === "Pending"
                      ? "gray"
                      : order.OrderStatus === "Processing"
                      ? "purple"
                      : order.OrderStatus === "Completed"
                      ? "green"
                      : "red",
                }}
              >
                {order.OrderStatus}
              </span>
            </span>
            <br />
            <span>
              <span className='text-sm'>Address: </span>
              <span className='font-semibold'>{order.CustomerAddress}</span>
            </span>
            <br />
            <span>
              <span className='text-sm'>Phone: </span>
              <span className='font-semibold'>{order.CustomerPhone}</span>
            </span>
          </p>
          <p className='text-sm'>
            Date:{" "}
            <span className='font-semibold'>
              {order.OrderAt.toLocaleString()}
            </span>
            <br />
            <span className='flex justify-end'>
              <span className='text-sm'>Total: $</span>
              <span className='font-semibold'>{order.TotalPrice}</span>
            </span>
          </p>
        </div>
        <div className='flex flex-col space-y-2'>
          {order.OrderProducts.map((product) => (
            <div
              className='flex items-center justify-between'
              key={product.OrderProductId}
            >
              <div className='text-sm flex items-center gap-2'>
                <span>
                  <Image
                    src={product.Product.ProductPrimaryImage}
                    alt={product.Product.ProductName}
                    className='w-6 h-6 rounded-full'
                  />
                </span>
                {product.ProductName} x{" "}
                {product.PurchaseType === "retail"
                  ? product.Quantity
                  : product.Quantity * product.Product.ProductPackingQuantity}
              </div>
              <p className='text-sm'>
                $
                {product.PurchaseType === "retail"
                  ? product.Price * product.Quantity
                  : product.Price *
                    product.Quantity *
                    product.Product.ProductPackingQuantity}
              </p>
            </div>
          ))}
        </div>
      </div>
      <hr className='mb-3' />
    </>
  );
}
