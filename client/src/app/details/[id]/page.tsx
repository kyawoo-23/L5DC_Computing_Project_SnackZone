import { prisma } from "@/lib/prisma";
import ClientImageCarousel from "./ClientImageCarousel";
import ClientForm from "./ClientForm";

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

  const handleAddToCart = (formData: FormData) => {
    const v = formData.get("variant");
    console.log(v);
  };

  return (
    <>
      {data && imageList && (
        <div className='grid grid-cols-2'>
          <div className='pb-10 pr-10'>
            <ClientImageCarousel imageList={imageList} />
          </div>
          <div className='pl-10 flex flex-col gap-2'>
            <h1 className='text-4xl font-bold'>{data.ProductName}</h1>

            <p className='text-lg font-semibold'>{data.ProductDescription}</p>

            <ClientForm
              id={params.id}
              ProductVariants={data.ProductVariants}
              price={data.ProductPrice}
              wholesalePrice={data.WholesalePrice}
              isPromotion={data.IsPromotion === 1 ? true : false}
              promotionPrice={data.PromotionPrice}
            />
          </div>
        </div>
      )}
    </>
  );
}
