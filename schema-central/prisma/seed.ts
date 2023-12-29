import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./shared";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.adminRole.upsert({
    where: { AdminRoleName: "Admin" },
    update: {},
    create: {
      AdminRoleName: "Admin",
    },
  });

  const staffRole = await prisma.adminRole.upsert({
    where: { AdminRoleName: "Staff" },
    update: {},
    create: {
      AdminRoleName: "Staff",
    },
  });

  const user = await prisma.admin.upsert({
    where: { Email: "admin@gmail.com" },
    update: {},
    create: {
      Email: "admin@gmail.com",
      Name: "Admin user",
      AdminRole: {
        connect: {
          AdminRoleId: adminRole.AdminRoleId,
        },
      },
    },
  });

  const done = await prisma.admin.update({
    where: {
      AdminId: user.AdminId,
    },
    data: {
      Password: await hashPassword("P@ssword1!!", user.AdminId),
    },
  });

  console.log({ done });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
