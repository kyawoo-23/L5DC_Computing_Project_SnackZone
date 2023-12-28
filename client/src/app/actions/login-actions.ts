"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { hashPassword } from "./shared";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function loginCustomer(formData: FormData): Promise<ResponseType> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.customer.findUnique({
      where: { CustomerEmail: email },
    });
    if (!user) {
      return {
        message: `Invalid email address`,
        isSuccess: false,
      };
    }

    if (
      (await hashPassword(password, user.CustomerId)) !== user.CustomerPassword
    ) {
      return {
        message: `Invalid credentials`,
        isSuccess: false,
      };
    }

    setCookie("cus-token", user.CustomerId, { cookies });
    setCookie("cus-name", user.CustomerName, { cookies });

    revalidatePath("/");
    return {
      message: `Login successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Login failed, ${error}`,
      isSuccess: false,
    };
  }
}
