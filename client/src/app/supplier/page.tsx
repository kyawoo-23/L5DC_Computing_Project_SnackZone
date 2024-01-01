import PageTitle from "@/components/Heading/PageTitle";
import ProductListingLayout from "@/components/Layout/ProductListingLayout";
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
      <ProductListingLayout>
        <>
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
                  width={300}
                  alt={supplier.SupplierName}
                  className='object-cover h-[180px]'
                  src={supplier.SupplierImage}
                />
              </CardBody>
              <CardFooter className='text-small'>
                <b>{supplier.SupplierName}</b>
              </CardFooter>
            </Card>
          ))}
        </>
      </ProductListingLayout>
    </div>
  );
}
