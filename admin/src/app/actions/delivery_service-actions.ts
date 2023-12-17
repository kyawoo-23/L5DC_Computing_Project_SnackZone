"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { utapi } from "@/lib/uploadthing";

export async function updateDeliveryService(
  formData: FormData
): Promise<ResponseType> {
  const name = formData.get("DeliveryServiceName") as string;
  const id = formData.get("DeliveryServiceId") as string;
  const isActive = formData.get("IsActive") as string;
  const imgFiles = formData.getAll("DeliveryServiceImage");

  let data: Prisma.DeliveryServiceUpdateInput = {};

  if (imgFiles[0] !== "") {
    const originalImg = formData.get("OriginalImage") as string;
    const imgKey = originalImg.split("/").pop() as string;
    const imgDeleteRes = await utapi.deleteFiles(imgKey);
    if (!imgDeleteRes) {
      return {
        message: `Failed to delete old image for deliveryService, ${name}`,
        isSuccess: false,
      };
    }

    const imgRes = await utapi.uploadFiles(imgFiles);
    if (imgRes[0].error) {
      return {
        message: `Failed to upload image for deliveryService, ${name}`,
        isSuccess: false,
      };
    }

    data = {
      DeliveryServiceName: name,
      IsActive: parseInt(isActive),
      DeliveryServiceImage: imgRes[0].data?.url,
    };
  } else {
    data = {
      DeliveryServiceName: name,
      IsActive: parseInt(isActive),
    };
  }

  try {
    await prisma.deliveryService.update({
      where: {
        DeliveryServiceId: id,
      },
      data,
    });
    revalidatePath("/deliveryServices");
    return {
      message: `DeliveryService, ${name} updated successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to update deliveryService, ${name}`,
      isSuccess: false,
    };
  }
}

export async function createDeliveryService(
  formData: FormData
): Promise<ResponseType> {
  const name = formData.get("Name") as string;
  const imgFiles = formData.getAll("Image");
  const imgRes = await utapi.uploadFiles(imgFiles);
  console.log("files", imgFiles);
  if (imgRes[0].error) {
    return {
      message: `Failed to upload image for deliveryService, ${name}`,
      isSuccess: false,
    };
  }

  const data: Prisma.DeliveryServiceCreateInput = {
    DeliveryServiceName: name,
    DeliveryServiceImage: imgRes[0].data?.url,
  };

  try {
    await prisma.deliveryService.create({
      data,
    });
    revalidatePath("/deliveryServices");
    return {
      message: `DeliveryService, ${name} created successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to create deliveryService, ${name}`,
      isSuccess: false,
    };
  }
}
