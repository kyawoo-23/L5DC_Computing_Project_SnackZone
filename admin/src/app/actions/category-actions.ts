"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { utapi } from "@/lib/uploadthing";

export async function updateCategory(
  formData: FormData
): Promise<ResponseType> {
  const name = formData.get("CategoryName") as string;
  const id = formData.get("CategoryId") as string;
  const isActive = formData.get("IsActive") as string;
  const imgFiles = formData.getAll("CategoryImage");

  let data: Prisma.CategoryUpdateInput = {};

  if (imgFiles[0] !== "") {
    const originalImg = formData.get("OriginalImage") as string;
    const imgKey = originalImg.split("/").pop() as string;
    const imgDeleteRes = await utapi.deleteFiles(imgKey);
    if (!imgDeleteRes) {
      return {
        message: `Failed to delete old image for category, ${name}`,
        isSuccess: false,
      };
    }

    const imgRes = await utapi.uploadFiles(imgFiles);
    if (imgRes[0].error) {
      return {
        message: `Failed to upload image for category, ${name}`,
        isSuccess: false,
      };
    }

    data = {
      CategoryName: name,
      IsActive: parseInt(isActive),
      CategoryImage: imgRes[0].data?.url,
    };
  } else {
    data = {
      CategoryName: name,
      IsActive: parseInt(isActive),
    };
  }

  try {
    await prisma.category.update({
      where: {
        CategoryId: id,
      },
      data,
    });
    revalidatePath("/categories");
    return {
      message: `Category, ${name} updated successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to update category, ${name}`,
      isSuccess: false,
    };
  }
}

export async function createCategory(
  formData: FormData
): Promise<ResponseType> {
  const name = formData.get("Name") as string;
  const imgFiles = formData.getAll("Image");
  const imgRes = await utapi.uploadFiles(imgFiles);
  console.log("files", imgFiles);
  if (imgRes[0].error) {
    return {
      message: `Failed to upload image for category, ${name}`,
      isSuccess: false,
    };
  }

  const data: Prisma.CategoryCreateInput = {
    CategoryName: name,
    CategoryImage: imgRes[0].data?.url,
  };

  try {
    await prisma.category.create({
      data,
    });
    revalidatePath("/categories");
    return {
      message: `Category, ${name} created successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to create category, ${name}`,
      isSuccess: false,
    };
  }
}
