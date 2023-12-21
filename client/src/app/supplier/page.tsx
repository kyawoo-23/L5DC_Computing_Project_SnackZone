import PageTitle from "@/components/Heading/PageTitle";
import { prisma } from "@/lib/prisma";
import { Image, Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";

export default async function SupplierPage() {
  const data = await prisma.supplier.findMany({
    where: {
      IsActive: 1,
    },
  });
  return (
    <div>
      <PageTitle title='Our suppliers' />
      <div className='grid grid-cols-4 gap-8'>
        {data.map((supplier) => (
          <Card
            shadow='sm'
            key={supplier.SupplierId}
            isPressable
            as={Link}
            href={`/supplier/${supplier.SupplierId}`}
          >
            <CardBody className='overflow-visible p-0'>
              <Image
                shadow='sm'
                radius='lg'
                width='100%'
                alt={supplier.SupplierName}
                className='w-full object-cover h-[180px]'
                src={supplier.SupplierImage}
              />
            </CardBody>
            <CardFooter className='text-small'>
              <b>{supplier.SupplierName}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
