"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { PAGE_COUNT } from "@/app/constants";

export async function fetchProductByPromotion(
  page: number
): Promise<ResponseType> {
  try {
    const data = await prisma.product.findMany({
      include: {
        Category: true,
        Supplier: true,
      },
      where: {
        IsPromotion: 1,
        IsActive: 1,
      },
      skip: page * PAGE_COUNT,
      take: PAGE_COUNT,
    });
    revalidatePath("/");
    return {
      message: `Product fetched successfully`,
      isSuccess: true,
      data,
    };
  } catch (error) {
    return {
      message: `Product failed to fetch`,
      isSuccess: false,
    };
  }
}
