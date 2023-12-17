import { prisma } from "@/lib/prisma";
import ClientCreateForm from "./ClientCreateForm";

export default async function CategoriesCreatePage() {
  const data = await prisma.adminRole.findMany();

  return (
    <>
      <ClientCreateForm roles={data} />
    </>
  );
}
