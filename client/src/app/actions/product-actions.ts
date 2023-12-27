"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { PAGE_COUNT } from "@/app/constants";

export async function fetchProduct(page: number): Promise<ResponseType> {
  try {
    const data = await prisma.product.findMany({
      include: {
        Category: true,
        Supplier: true,
      },
      where: {
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

export async function fetchProductFromSearch(
  query: string,
  page: number
): Promise<ResponseType> {
  try {
    const data = await prisma.product.findMany({
      include: {
        Category: true,
        Supplier: true,
      },
      where: {
        IsActive: 1,
        ProductName: {
          contains: query,
        },
      },
      skip: page * PAGE_COUNT,
      take: PAGE_COUNT,
    });
    revalidatePath("/search");
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
