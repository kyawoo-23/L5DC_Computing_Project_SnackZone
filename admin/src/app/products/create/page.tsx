import ClientProductsCreatePage from "./ClientCreateForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function page() {
  const suppliers = await prisma.supplier.findMany({
    where: {
      IsActive: 1,
    },
  });
  const categories = await prisma.category.findMany({
    where: {
      IsActive: 1,
    },
  });
  const variants = await prisma.variant.findMany();

  return (
    <ClientProductsCreatePage
      suppliers={suppliers}
      categories={categories}
      variants={variants}
    />
  );
}
