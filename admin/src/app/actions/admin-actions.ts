"use server";

import { prisma } from "@/lib/prisma";
import { Admin, type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { hashPassword } from "./shared";

export async function updateAdmin(formData: FormData): Promise<ResponseType> {
  const adminId = formData.get("Id") as string;

  let data: Prisma.AdminUpdateInput;
  if ((formData.get("Password") as string) !== "") {
    data = {
      Email: formData.get("Email") as string,
      Name: formData.get("Name") as string,
      Password: await hashPassword(formData.get("Password") as string, adminId),
      IsActive: parseInt(formData.get("IsActive") as string),
      AdminRole: {
        connect: {
          AdminRoleId: formData.get("Role") as string,
        },
      },
    };
  } else {
    data = {
      Email: formData.get("Email") as string,
      Name: formData.get("Name") as string,
      IsActive: parseInt(formData.get("IsActive") as string),
      AdminRole: {
        connect: {
          AdminRoleId: formData.get("Role") as string,
        },
      },
    };
  }

  try {
    await prisma.admin.update({
      where: {
        AdminId: adminId,
      },
      data,
    });

    revalidatePath("/admins");
    return {
      isSuccess: true,
      message: "Admin updated successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "Error updating admin",
    };
  }
}

export async function createAdmin(formData: FormData): Promise<ResponseType> {
  try {
    const createdAdmin = await prisma.admin.create({
      data: {
        Email: formData.get("Email") as string,
        Name: formData.get("Name") as string,
        AdminRole: {
          connect: {
            AdminRoleId: formData.get("Role") as string,
          },
        },
      },
    });

    await prisma.admin.update({
      where: {
        AdminId: createdAdmin.AdminId,
      },
      data: {
        Password: await hashPassword(
          process.env.DEFAULT_PASSWORD as string,
          createdAdmin.AdminId
        ),
      },
    });

    revalidatePath("/admin");
    return {
      isSuccess: true,
      message: "Admin created successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "Error creating admin",
    };
  }
}
