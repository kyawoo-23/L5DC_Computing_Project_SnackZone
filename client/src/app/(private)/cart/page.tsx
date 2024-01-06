import PageTitle from "@/components/Heading/PageTitle";
import { prisma } from "@/lib/prisma";
import { Button, Chip, Link, Image } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import ClientRemoveButton from "./ClientRemoveButton";
import ClientCheckout from "./ClientCheckout";

export default async function CartPage() {
  const token = getCookie("cus-token", { cookies }) as string;

  const data = await prisma.cartProduct.findMany({
    where: {
      CustomerId: token,
    },
    include: {
      Product: {
        include: {
          Supplier: true,
        },
      },
      ProductVariant: {
        include: {
          Variant: true,
        },
      },
    },
  });

  const info = await prisma.customer.findUnique({
    where: {
      CustomerId: token,
    },
  });

  return (
    <div>
      <PageTitle title='Cart list' />

      <div className='grid gap-6'>
        {data && data.length > 0 ? (
          data.map((item) => (
            <Link
              className='p-4 border-2 rounded-lg hover:border-primary relative'
              key={item.CartProductId}
              href={`/details/${item.ProductId}`}
            >
              <div className='grid grid-cols-2 sm:grid-cols-6 items-center gap-4 text-white w-full'>
                <Image
                  src={item.Product.ProductPrimaryImage}
                  alt={item.Product.ProductName}
                  className='w-28 h-28 object-cover'
                />

                <div className='pt-1'>
                  <span className='text-capitalize text-xs'>
                    {item.Product.Supplier.SupplierName}
                  </span>
                  <p className='font-medium'>{item.Product.ProductName}</p>
                  <Chip size='sm' color='default' className='mt-2'>
                    {item.ProductVariant?.Variant.VariantName}
                  </Chip>
                </div>

                <div>
                  <Chip size='sm'>{item.PurchaseType}</Chip>
                </div>

                <div>
                  <div className='flex items-center'>
                    {item.PurchaseType === "wholesale" ? (
                      <span
                        className={`${
                          item.Product.IsPromotion === 1
                            ? "line-through text-sm"
                            : ""
                        }`}
                      >
                        ${item.Product.WholesalePrice}
                      </span>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <Chip size='sm'>
                    Qty: <b>{item.ProductQuantity}</b>
                  </Chip>
                </div>

                <div>
                  Total:{" "}
                  <b>
                    $
                    {item.PurchaseType === "wholesale"
                      ? item.ProductQuantity *
                        item.Product.WholesalePrice! *
                        item.Product.ProductPackingQuantity
                      : item.ProductQuantity *
                        (item.Product.IsPromotion === 1
                          ? item.Product.PromotionPrice!
                          : item.Product.ProductPrice!)}
                  </b>
                </div>
              </div>
              <ClientRemoveButton id={item.CartProductId} />
            </Link>
          ))
        ) : (
          <div className='col-span-2 mt-20'>
            <p className='text-gray-400 text-center'>Your cart is empty</p>
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
        {data && data.length > 0 && info && (
          <ClientCheckout data={data} info={info} />
        )}
      </div>
    </div>
  );
}
