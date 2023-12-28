"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { generateInvoiceCode } from "./shared";
import { utapi } from "@/lib/uploadthing";

type checkoutCartProps = {
  CustomerPhone: string;
  CustomerAddress: string;
  IsPrepaid: number;
  TotalPrice: number;
  formData: FormData;
};
export async function checkoutCart({
  CustomerPhone,
  CustomerAddress,
  IsPrepaid,
  TotalPrice,
  formData,
}: checkoutCartProps): Promise<ResponseType> {
  const customerId = getCookie("cus-token", { cookies }) as string;
  if (!customerId) {
    return {
      message: `You must login to checkout cart`,
      isSuccess: false,
    };
  }

  try {
    const orderCode = generateInvoiceCode();

    const createdOrder = await prisma.customerOrder.create({
      data: {
        Customer: {
          connect: {
            CustomerId: customerId,
          },
        },
        CustomerPhone,
        CustomerAddress,
        IsPrepaid,
        TotalPrice,
        OrderCode: orderCode,
      },
    });

    if (IsPrepaid) {
      const imgFile = formData.get("prepaidFile");
      const imgRes = await utapi.uploadFiles(imgFile);
      await prisma.customerOrder.update({
        where: {
          CustomerOrderId: createdOrder.CustomerOrderId,
        },
        data: {
          PrepaidVoucherImage: imgRes ? imgRes.data?.url : null,
        },
      });
    }

    const cartProducts = await prisma.cartProduct.findMany({
      where: {
        CustomerId: customerId,
      },
      include: {
        Product: {
          include: {
            Supplier: true,
          },
        },
        ProductVariant: {
          include: {
            Variant: true,
          },
        },
      },
    });

    const orderProducts = cartProducts.map((cartProduct) => {
      return {
        ProductName: cartProduct.Product.ProductName,
        VariantName: cartProduct.ProductVariant?.Variant.VariantName,
        Quantity: cartProduct.ProductQuantity,
        Price:
          cartProduct.PurchaseType === "wholesale"
            ? cartProduct.Product.WholesalePrice!
            : cartProduct.Product.IsPromotion
            ? cartProduct.Product.PromotionPrice
            : cartProduct.Product.ProductPrice,
        ProductId: cartProduct.ProductId,
        CustomerOrderId: createdOrder.CustomerOrderId,
        PurchaseType: cartProduct.PurchaseType,
      };
    });

    for (const orderProduct of orderProducts) {
      await prisma.orderProduct.create({
        data: {
          Price: orderProduct.Price!,
          ProductName: orderProduct.ProductName,
          Quantity: orderProduct.Quantity,
          VariantName: orderProduct.VariantName!,
          PurchaseType: orderProduct.PurchaseType,
          ProductId: orderProduct.ProductId,
          CustomerOrderId: orderProduct.CustomerOrderId,
        },
      });
    }

    await prisma.cartProduct.deleteMany({
      where: {
        CustomerId: customerId,
      },
    });

    await prisma.customer.update({
      where: {
        CustomerId: customerId,
      },
      data: {
        CustomerPhone,
        CustomerAddress,
      },
    });

    revalidatePath("/cart");
    return {
      message: `Checkout cart successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Checkout cart failed, ${error}`,
      isSuccess: false,
    };
  }
}

export async function removeFromCart(
  cartProductId: string
): Promise<ResponseType> {
  const customerId = getCookie("cus-token", { cookies }) as string;
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
  const customerId = getCookie("cus-token", { cookies }) as string;

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
