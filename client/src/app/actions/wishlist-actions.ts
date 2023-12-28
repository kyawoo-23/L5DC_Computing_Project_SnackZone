"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export async function checkProductInWishList(
  productId: string
): Promise<ResponseType> {
  const customerId = getCookie("cus-token", { cookies }) as string;
  if (!customerId) {
    return {
      message: `You must login`,
      isSuccess: false,
    };
  }

  try {
    const data = await prisma.wishListProduct.findFirst({
      where: {
        ProductId: productId,
        CustomerId: customerId,
      },
    });

    if (data) {
      return {
        message: `Item in wishlist`,
        isSuccess: true,
        data: data.WishListProductId,
      };
    } else {
      return {
        message: `Item not in wishlist`,
        isSuccess: true,
      };
    }
  } catch (error) {
    return {
      message: `Something went wrong`,
      isSuccess: false,
    };
  }
}

export async function removeFromWishList(
  wishlistProductId: string
): Promise<ResponseType> {
  const customerId = getCookie("cus-token", { cookies }) as string;
  if (!customerId) {
    return {
      message: `You must login to remove from wishlist`,
      isSuccess: false,
    };
  }

  try {
    await prisma.wishListProduct.delete({
      where: {
        WishListProductId: wishlistProductId,
      },
    });

    revalidatePath("/wishlist");
    return {
      message: `Removed from wishlist successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Fail to remove from wishlist, ${error}`,
      isSuccess: false,
    };
  }
}

export async function addToWishList(productId: string): Promise<ResponseType> {
  const customerId = getCookie("cus-token", { cookies }) as string;
  if (!customerId) {
    return {
      message: `You must login to add to wishlist`,
      isSuccess: false,
    };
  }

  try {
    const added = await prisma.wishListProduct.create({
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
      },
    });

    revalidatePath("/wishlist");
    return {
      message: `Added to wishlist successfully`,
      isSuccess: true,
      data: added.WishListProductId,
    };
  } catch (error) {
    return {
      message: `Fail to add to wishlist, ${error}`,
      isSuccess: false,
    };
  }
}
