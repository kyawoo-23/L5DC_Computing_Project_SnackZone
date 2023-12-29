"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function updateProfile(formData: FormData): Promise<ResponseType> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const address = formData.get("address") as string;

  try {
    const token = getCookie("cus-token", { cookies });
    if (!token) {
      return {
        message: `Update profile failed, token not found`,
        isSuccess: false,
      };
    }

    if (password === "") {
      await prisma.customer.update({
        where: {
          CustomerId: token,
        },
        data: {
          CustomerName: name,
          CustomerPhone: phone,
          CustomerEmail: email,
          CustomerAddress: address,
        },
      });
    } else {
      await prisma.customer.update({
        where: {
          CustomerId: token,
        },
        data: {
          CustomerName: name,
          CustomerPhone: phone,
          CustomerEmail: email,
          CustomerAddress: address,
          CustomerPassword: password,
        },
      });
    }

    revalidatePath("/profile");
    return {
      message: `Profile updated successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Profile update failed, ${error}`,
      isSuccess: false,
    };
  }
}
