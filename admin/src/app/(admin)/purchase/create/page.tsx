import ClientPurchaseCreatePage from "./ClientCreateForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PurchaseCreatePage() {
  const products = await prisma.product.findMany();

  return <ClientPurchaseCreatePage products={products} />;
}
