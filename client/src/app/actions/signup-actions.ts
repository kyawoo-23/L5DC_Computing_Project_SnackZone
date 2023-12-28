"use server";

import { prisma } from "@/lib/prisma";
// import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { hashPassword } from "./shared";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function createCustomer(
  formData: FormData
): Promise<ResponseType> {
  try {
    const createdCustomer = await prisma.customer.create({
      data: {
        CustomerEmail: formData.get("email") as string,
        CustomerName: formData.get("name") as string,
      },
    });

    await prisma.customer.update({
      where: {
        CustomerId: createdCustomer.CustomerId,
      },
      data: {
        CustomerPassword: await hashPassword(
          formData.get("password") as string,
          createdCustomer.CustomerId
        ),
      },
    });

    setCookie("cus-token", createdCustomer.CustomerId, { cookies });
    setCookie("cus-name", createdCustomer.CustomerName, { cookies });

    return {
      isSuccess: true,
      message: "Account created successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: "Error creating account",
    };
  }
}
