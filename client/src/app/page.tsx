import { prisma } from "@/lib/prisma";
import { Button } from "@nextui-org/button";
import { CardFooter, Chip, Divider, Image, Link } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaRegHeart } from "react-icons/fa6";

export default async function Page() {
  const data = await prisma.product.findMany({
    include: {
      Category: true,
      Supplier: true,
    },
    where: {
      IsActive: 1,
    },
  });
  console.log(data);
  return (
    <div className='grid grid-cols-4 justify-items-center gap-6'>
      {data &&
        data.map((product) => (
          <Card className='py-4 w-fit' key={product.ProductId}>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <div className='flex justify-between w-full'>
                <div>
                  <p className='text-xs uppercase font-bold'>
                    {product.Supplier.SupplierName}
                  </p>
                  <small className='text-default-500'>
                    <Chip size='sm' className='my-1'>
                      {product.Category.CategoryName}
                    </Chip>
                  </small>
                </div>
                <div>
                  <Button isIconOnly size='sm' aria-label='Wishlist'>
                    <FaRegHeart />
                  </Button>
                </div>
              </div>
              <h4 className='font-bold text-lg'>{product.ProductName}</h4>
            </CardHeader>
            <CardBody className='overflow-visible py-2'>
              <Image
                alt='Card background'
                className='object-cover rounded-xl h-[220px] border-2 border-gray-800'
                src={product.ProductPrimaryImage}
                width={200}
              />
            </CardBody>
            <CardFooter>
              <div className='flex justify-between items-center w-full'>
                <p className='text-sm uppercase font-bold'>
                  $ {product.ProductPrice}
                </p>

                <Button as={Link} href={`/details/${product.ProductId}}`}>
                  Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
