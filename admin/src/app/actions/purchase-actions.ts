"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function createPurchase(
  formData: FormData
): Promise<ResponseType> {
  try {
    const purchasedRes = await prisma.purchaseProduct.create({
      data: {
        ExpiryDate: new Date(formData.get("Expiry") as string).toISOString(),
        OriginalPrice: parseFloat(formData.get("Price") as string),
        PurchaseQuantity: parseInt(formData.get("Quantity") as string),
        ProductStock: parseInt(formData.get("Quantity") as string),
        Product: {
          connect: {
            ProductId: formData.get("Product") as string,
          },
        },
        VariantName: formData.get("ProductVariant") as string,
        PurchasedBy: {
          connect: {
            AdminId: getCookie("token", { cookies }),
          },
        },
      },
    });
    return {
      message: `Successfully created purchase`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to create purchase`,
      isSuccess: false,
    };
  }
}

export async function searchProductVariant(query: string): Promise<
  ResponseType<
    Prisma.ProductVariantGetPayload<{
      include: {
        Variant: true;
      };
    }>[]
  >
> {
  try {
    const productVariants = await prisma.productVariant.findMany({
      where: {
        ProductId: query,
      },
      include: {
        Variant: true,
      },
    });

    revalidatePath("/products/create");
    return {
      message: `Successfully got product variants`,
      isSuccess: true,
      data: productVariants,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Failed to get product variants for product`,
      isSuccess: false,
    };
  }
}
