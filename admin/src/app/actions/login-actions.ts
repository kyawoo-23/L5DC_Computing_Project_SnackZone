"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { hashPassword } from "./shared";

export async function login(formData: FormData): Promise<ResponseType> {
  const email = formData.get("Email") as string;
  const password = formData.get("Password") as string;

  try {
    const user = await prisma.admin.findUnique({
      where: { Email: email },
      include: {
        AdminRole: true,
      },
    });
    if (!user) {
      throw new Error("Invalid email address");
    }

    if ((await hashPassword(password, user.AdminId)) !== user.Password) {
      throw new Error("Invalid credentials");
    }

    revalidatePath("/");
    return {
      message: `Login successfully`,
      isSuccess: true,
      data: {
        id: user.AdminId,
        name: user.Name,
        role: user.AdminRole.AdminRoleName,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Login failed, ${error}`,
      isSuccess: false,
    };
  }
}
