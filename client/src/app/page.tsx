import { prisma } from "@/lib/prisma";
import { Button } from "@nextui-org/button";

export default async function Page() {
  const data = await prisma.product.findMany();
  console.log(data);
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
