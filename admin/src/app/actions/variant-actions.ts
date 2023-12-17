"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";

export async function updateVariant(formData: FormData): Promise<ResponseType> {
  const name = formData.get("VariantName") as string;
  const id = formData.get("VariantId") as string;
  const color = formData.get("VariantColor") as string;

  const data: Prisma.VariantUpdateInput = {
    VariantColor: color,
    VariantName: name,
  };

  try {
    await prisma.variant.update({
      where: {
        VariantId: id,
      },
      data,
    });
    revalidatePath("/variants");
    return {
      message: `Variant, ${name} updated successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to update variant, ${name}`,
      isSuccess: false,
    };
  }
}

export async function createVariant(formData: FormData): Promise<ResponseType> {
  const name = formData.get("Name") as string;
  const color = formData.get("Color") as string;

  const data: Prisma.VariantCreateInput = {
    VariantColor: color,
    VariantName: name,
  };

  try {
    await prisma.variant.create({
      data,
    });
    revalidatePath("/variants");
    return {
      message: `Variant, ${name} created successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to create variant, ${name}`,
      isSuccess: false,
    };
  }
}
