import PageTitle from "@/components/Heading/PageTitle";
import { prisma } from "@/lib/prisma";
import { Image, Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";

export default async function CategoryPage() {
  const data = await prisma.category.findMany({
    where: {
      IsActive: 1,
    },
  });
  return (
    <div>
      <PageTitle title='Browse through different categories' />
      <div className='grid grid-cols-4 gap-8'>
        {data.map((category) => (
          <Card
            shadow='sm'
            key={category.CategoryId}
            isPressable
            as={Link}
            href={`/category/${category.CategoryId}`}
          >
            <CardBody className='overflow-visible p-0'>
              <Image
                shadow='sm'
                radius='lg'
                width='100%'
                alt={category.CategoryName}
                className='w-full object-cover h-[180px]'
                src={category.CategoryImage}
              />
            </CardBody>
            <CardFooter className='text-small'>
              <b>{category.CategoryName}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
