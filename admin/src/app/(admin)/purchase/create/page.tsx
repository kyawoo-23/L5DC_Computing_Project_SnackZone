import ClientPurchaseCreatePage from "./ClientCreateForm";
import { prisma } from "@/lib/prisma";

export default async function PurchaseCreatePage() {
  const products = await prisma.product.findMany();

  return <ClientPurchaseCreatePage products={products} />;
}
