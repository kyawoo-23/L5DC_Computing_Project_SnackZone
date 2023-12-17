"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { utapi } from "@/lib/uploadthing";

export async function updateSupplier(
  formData: FormData
): Promise<ResponseType> {
  const name = formData.get("SupplierName") as string;
  const id = formData.get("SupplierId") as string;
  const isActive = formData.get("IsActive") as string;
  const imgFiles = formData.getAll("SupplierImage");

  let data: Prisma.SupplierUpdateInput = {};

  if (imgFiles[0] !== "") {
    const originalImg = formData.get("OriginalImage") as string;
    const imgKey = originalImg.split("/").pop() as string;
    const imgDeleteRes = await utapi.deleteFiles(imgKey);
    if (!imgDeleteRes) {
      return {
        message: `Failed to delete old image for supplier, ${name}`,
        isSuccess: false,
      };
    }

    const imgRes = await utapi.uploadFiles(imgFiles);
    if (imgRes[0].error) {
      return {
        message: `Failed to upload image for supplier, ${name}`,
        isSuccess: false,
      };
    }

    data = {
      SupplierName: name,
      IsActive: parseInt(isActive),
      SupplierImage: imgRes[0].data?.url,
    };
  } else {
    data = {
      SupplierName: name,
      IsActive: parseInt(isActive),
    };
  }

  try {
    await prisma.supplier.update({
      where: {
        SupplierId: id,
      },
      data,
    });
    revalidatePath("/suppliers");
    return {
      message: `Supplier, ${name} updated successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to update supplier, ${name}`,
      isSuccess: false,
    };
  }
}

export async function createSupplier(
  formData: FormData
): Promise<ResponseType> {
  const name = formData.get("Name") as string;
  const imgFiles = formData.getAll("Image");
  const imgRes = await utapi.uploadFiles(imgFiles);
  console.log("files", imgFiles);
  if (imgRes[0].error) {
    return {
      message: `Failed to upload image for supplier, ${name}`,
      isSuccess: false,
    };
  }

  const data: Prisma.SupplierCreateInput = {
    SupplierName: name,
    SupplierImage: imgRes[0].data?.url,
  };

  try {
    await prisma.supplier.create({
      data,
    });
    revalidatePath("/suppliers");
    return {
      message: `Supplier, ${name} created successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to create supplier, ${name}`,
      isSuccess: false,
    };
  }
}
