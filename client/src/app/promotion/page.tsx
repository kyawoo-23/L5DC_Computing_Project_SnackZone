import { Image } from "@nextui-org/react";
import promotionBanner from "/public/promotion-banner.jpg";
import ProductListingLayout from "@/components/Layout/ProductListingLayout";
import ProductCard from "@/components/Card/ProductCard";
import { PAGE_COUNT } from "@/app/constants";
import { prisma } from "@/lib/prisma";
import LoadMore from "./LoadMore";
import ClientTextAnimation from "./ClientTextAnimation";

export default async function PromotionPage() {
  const data = await prisma.product.findMany({
    where: {
      IsPromotion: 1,
      IsActive: 1,
    },
    include: {
      Category: true,
      Supplier: true,
    },
    skip: 0,
    take: PAGE_COUNT,
  });

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 items-center mb-8'>
        <div>
          <ClientTextAnimation />
        </div>
        <div>
          <Image
            isZoomed
            isBlurred
            src={promotionBanner.src}
            alt='promotion banner'
            className='min-w-screen rounded-xl'
          />
        </div>
      </div>

      <ProductListingLayout>
        <>
          {data &&
            data.map((product) => (
              <ProductCard
                key={product.ProductId}
                categoryName={product.Category.CategoryName}
                productId={product.ProductId}
                productName={product.ProductName}
                productPrice={product.ProductPrice!}
                productPrimaryImage={product.ProductPrimaryImage}
                supplierName={product.Supplier.SupplierName}
                isPromotion={product.IsPromotion}
                promotionPrice={product.PromotionPrice || product.ProductPrice!}
              />
            ))}
        </>
      </ProductListingLayout>
      <LoadMore />
    </>
  );
}
