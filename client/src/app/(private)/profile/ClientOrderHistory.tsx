"use client";

import { Prisma } from "@prisma/client";
import { Image } from "@nextui-org/react";
import Link from "next/link";

type ClientOrderHistoryProps = {
  order: Prisma.CustomerOrderGetPayload<{
    include: {
      DeliveryService: true;
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
      <div className='border rounded-lg p-4 my-4 hover:ring hover:ring-primary hover:border-primary'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <p className='text-sm font-semibold'>Order ID: {order.OrderCode}</p>
            <p className='text-sm my-1'>
              <span className='text-sm font-semibold me-2'>Status: </span>
              <span
                className={`px-2 rounded-full text-xs font-semibold ${
                  order.OrderStatus === "Pending"
                    ? "bg-gray-300 text-gray-800"
                    : order.OrderStatus === "Processing"
                    ? "bg-purple-300 text-purple-800"
                    : order.OrderStatus === "Completed"
                    ? "bg-green-300 text-green-800"
                    : "bg-red-300 text-red-800"
                }`}
              >
                {order.OrderStatus}
              </span>
            </p>
            <p className='text-sm my-1'>
              <span className='text-sm font-semibold'>Address:</span>{" "}
              {order.CustomerAddress}
            </p>
            <p className='text-sm'>
              <span className='text-sm font-semibold'>Phone:</span>{" "}
              {order.CustomerPhone}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-sm font-semibold'>
              Date: {order.OrderAt.toLocaleString()}
            </p>
            {order.DeliveryService && (
              <p className='text-sm my-1'>
                Delivery Service:{" "}
                <span className='font-semibold'>
                  {order.DeliveryService.DeliveryServiceName}
                </span>
              </p>
            )}
            <p className='text-sm my-1'>
              Total (with delivery charges): $
              <span className='font-semibold'>{order.TotalPrice}</span>
            </p>
          </div>
        </div>
        <hr className='my-2' />
        <div className='space-y-2'>
          {order.OrderProducts.map((product) => (
            <Link
              href={`/details/${product.Product.ProductId}`}
              className='flex items-center justify-between text-sm hover:text-primary'
              key={product.OrderProductId}
            >
              <div className='flex items-center gap-2'>
                <Image
                  src={product.Product.ProductPrimaryImage}
                  alt={product.Product.ProductName}
                  className='w-6 h-6 rounded-full'
                  width={24}
                  height={24}
                />
                <span>
                  {product.ProductName} x{" "}
                  {product.PurchaseType === "retail"
                    ? product.Quantity
                    : product.Quantity * product.Product.ProductPackingQuantity}
                </span>
              </div>
              <p className='font-semibold'>
                $
                {product.PurchaseType === "retail"
                  ? product.Price * product.Quantity
                  : product.Price *
                    product.Quantity *
                    product.Product.ProductPackingQuantity}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
