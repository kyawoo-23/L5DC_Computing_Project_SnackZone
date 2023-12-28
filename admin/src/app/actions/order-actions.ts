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
