"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { type Prisma } from "@prisma/client";

export async function removeFromCart(
  cartProductId: string
): Promise<ResponseType> {
  const customerId = getCookie("token", { cookies }) as string;
  if (!customerId) {
    return {
      message: `You must login to remove from cart`,
      isSuccess: false,
    };
  }

  try {
    await prisma.cartProduct.delete({
      where: {
        CartProductId: cartProductId,
      },
    });

    revalidatePath("/cart");
    return {
      message: `Removed from cart successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Fail to remove from cart, ${error}`,
      isSuccess: false,
    };
  }
}

export async function addToCart({
  productId,
  quantity,
  purchaseType,
  productVariantId,
}: {
  productId: string;
  quantity: number;
  purchaseType: string;
  productVariantId: string;
}): Promise<ResponseType> {
  const customerId = getCookie("token", { cookies }) as string;

  if (!customerId) {
    return {
      message: `You must login to add to cart`,
      isSuccess: false,
    };
  }

  try {
    const existingCartProduct = await prisma.cartProduct.findFirst({
      where: {
        CustomerId: customerId,
        ProductId: productId,
        ProductVariantId: productVariantId,
        PurchaseType: purchaseType,
      },
    });

    if (existingCartProduct) {
      await prisma.cartProduct.update({
        where: {
          CartProductId: existingCartProduct.CartProductId,
        },
        data: {
          ProductQuantity: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.cartProduct.create({
        data: {
          Customer: {
            connect: {
              CustomerId: customerId,
            },
          },
          Product: {
            connect: {
              ProductId: productId,
            },
          },
          ProductVariant: {
            connect: {
              ProductVariantId: productVariantId,
            },
          },
          ProductQuantity: quantity,
          PurchaseType: purchaseType,
        },
      });
    }

    revalidatePath("/cart");
    return {
      message: `Added to cart successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Fail to add to cart, ${error}`,
      isSuccess: false,
    };
  }
}
