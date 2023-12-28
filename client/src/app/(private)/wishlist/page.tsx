import PageTitle from "@/components/Heading/PageTitle";
import { prisma } from "@/lib/prisma";
import { Button, Chip, Image, Link } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { FaTrash } from "react-icons/fa6";
import ClientRemoveButton from "./ClientRemoveButton";

export default async function WishListPage() {
  const token = getCookie("cus-token") as string;
  const data = await prisma.wishListProduct.findMany({
    where: {
      CustomerId: token,
    },
    include: {
      Product: {
        include: {
          Supplier: true,
          ProductVariants: {
            include: {
              Variant: true,
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <PageTitle title='Wishlist' />

      <div className='grid grid-cols-2 gap-6'>
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              className='p-4 border-2 rounded-lg hover:border-primary relative'
              key={item.WishListProductId}
            >
              <Link
                href={`/details/${item.ProductId}`}
                className='flex items-center gap-4 text-white'
              >
                <Image
                  src={item.Product.ProductPrimaryImage}
                  alt={item.Product.ProductName}
                  className='w-28 h-28 object-cover'
                />
                <div>
                  <span className='text-capitalize text-sm'>
                    {item.Product.Supplier.SupplierName}
                  </span>
                  <p className='font-medium'>{item.Product.ProductName}</p>
                  <div className='pt-1 flex items-center'>
                    <span
                      className={`${
                        item.Product.IsPromotion === 1
                          ? "line-through text-sm"
                          : ""
                      }`}
                    >
                      ${item.Product.ProductPrice}
                    </span>

                    <Chip
                      size='sm'
                      color='secondary'
                      className={`ms-3 px-1 font-semibold ${
                        item.Product.IsPromotion === 1 ? "" : "hidden"
                      }`}
                    >
                      ${item.Product.PromotionPrice}
                    </Chip>
                  </div>
                </div>
              </Link>
              <ClientRemoveButton id={item.WishListProductId} />
            </div>
          ))
        ) : (
          <div className='col-span-2 mt-20'>
            <p className='text-gray-400 text-center'>Your wishlist is empty</p>
            <div className='flex justify-center'>
              <Button
                color='default'
                variant='solid'
                className='mt-4'
                as={Link}
                href='/'
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
