import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
