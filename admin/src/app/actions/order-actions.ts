"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function completeOrder(id: string): Promise<ResponseType> {
  try {
    await prisma.customerOrder.update({
      where: {
        CustomerOrderId: id,
      },
      data: {
        OrderStatus: "Completed",
        DeliveredAt: new Date(),
      },
    });

    const orderProducts = await prisma.orderProduct.findMany({
      where: {
        CustomerOrderId: id,
      },
      include: {
        Product: true,
      },
    });

    const purchaseProductUpdates = [];
    for (const orderProduct of orderProducts) {
      const purchaseProducts = await prisma.purchaseProduct.findMany({
        where: {
          Product: {
            ProductId: orderProduct.ProductId,
          },
          ProductStock: {
            gt: 0,
          },
        },
        orderBy: {
          ExpiryDate: "asc",
        },
      });

      let remainingQuantity =
        orderProduct.PurchaseType === "retail"
          ? orderProduct.Quantity
          : orderProduct.Quantity * orderProduct.Product.ProductPackingQuantity;

      for (const purchaseProduct of purchaseProducts) {
        const availableQuantity = purchaseProduct.ProductStock;

        if (remainingQuantity > 0 && availableQuantity > 0) {
          const reduceQuantity = Math.min(remainingQuantity, availableQuantity);
          remainingQuantity -= reduceQuantity;

          purchaseProductUpdates.push(
            prisma.purchaseProduct.update({
              where: {
                PurchaseProductId: purchaseProduct.PurchaseProductId,
              },
              data: {
                ProductStock: {
                  decrement: reduceQuantity,
                },
              },
            })
          );
        }
      }

      if (remainingQuantity > 0) {
        return {
          message: `Insufficient stock for Product: ${orderProduct.Product.ProductName}`,
          isSuccess: false,
        };
      }
    }

    await prisma.$transaction(purchaseProductUpdates);

    revalidatePath(`/orders/${id}`);
    return {
      message: `Order completed successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to complete order`,
      isSuccess: false,
    };
  }
}

export async function acceptOrder(
  adminId: string,
  deliveryServiceId: string,
  orderId: string
): Promise<ResponseType> {
  try {
    await prisma.customerOrder.update({
      where: {
        CustomerOrderId: orderId,
      },
      data: {
        AcceptedAt: new Date(),
        OrderStatus: "Processing",
        AssignedAdmin: {
          connect: {
            AdminId: adminId,
          },
        },
        DeliveryService: {
          connect: {
            DeliveryServiceId: deliveryServiceId,
          },
        },
      },
    });

    revalidatePath(`/orders/${orderId}`);
    return {
      message: `Order accepted successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to accept order`,
      isSuccess: false,
    };
  }
}

export async function rejectOrder(id: string): Promise<ResponseType> {
  const token = getCookie("token", { cookies });

  try {
    await prisma.customerOrder.update({
      where: {
        CustomerOrderId: id,
      },
      data: {
        OrderStatus: "Cancelled",
        AssignedAdmin: {
          connect: {
            AdminId: token,
          },
        },
      },
    });

    revalidatePath(`/orders/${id}`);
    return {
      message: `Order cancelled successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to cancel order`,
      isSuccess: false,
    };
  }
}
