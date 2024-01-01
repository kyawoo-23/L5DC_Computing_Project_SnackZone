import { prisma } from "@/lib/prisma";
import ClientImageCarousel from "./ClientImageCarousel";
import ClientForm from "./ClientForm";
import { Chip } from "@nextui-org/react";
import { FaWeightHanging } from "react-icons/fa6";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.product.findUnique({
    where: {
      ProductId: params.id,
    },
    include: {
      Category: true,
      Supplier: true,
      ProductVariants: {
        include: {
          Variant: true,
        },
      },
    },
  });
  const imageList = await prisma.productImage.findMany({
    where: {
      ProductId: params.id,
    },
  });

  return (
    <>
      {data && imageList && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='pb-10 lg:pr-10'>
            <ClientImageCarousel
              primaryImg={data.ProductPrimaryImage}
              imageList={imageList}
            />
          </div>
          <div className='pb-10 lg:pl-10 flex flex-col gap-2'>
            <p className='text-xs uppercase font-bold'>
              {data.Supplier.SupplierName}
            </p>
            <h1 className='text-4xl font-bold'>{data.ProductName}</h1>
            <Chip size='sm' className='px-2'>
              {data.Category.CategoryName}
            </Chip>

            <p className='text-md font-semibold flex gap-2 items-center mt-3'>
              <FaWeightHanging />
              {data.ProductWeight}g
            </p>
            <p className='text-lg font-medium'>{data.ProductDescription}</p>

            <ClientForm
              id={params.id}
              ProductVariants={data.ProductVariants}
              price={data.ProductPrice}
              wholesalePrice={data.WholesalePrice}
              packingQuantity={data.ProductPackingQuantity}
              isPromotion={data.IsPromotion === 1 ? true : false}
              promotionPrice={data.PromotionPrice}
            />
          </div>
        </div>
      )}
    </>
  );
}
