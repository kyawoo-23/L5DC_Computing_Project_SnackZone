import ProductCard from "@/components/Card/ProductCard";
import { prisma } from "@/lib/prisma";
import LoadMore from "@/app/LoadMore";
import { PAGE_COUNT } from "@/app/constants";
import ProductListingLayout from "@/components/Layout/ProductListingLayout";

export default async function Page() {
  const data = await prisma.product.findMany({
    include: {
      Category: true,
      Supplier: true,
    },
    where: {
      IsActive: 1,
    },
    skip: 0,
    take: PAGE_COUNT,
  });

  const featured = await prisma.product.findMany({
    include: {
      Category: true,
      Supplier: true,
    },
    where: {
      IsActive: 1,
      IsFeatured: 1,
    },
  });

  return (
    <>
      {featured && featured.length > 0 && (
        <>
          <h3 className='text-lg font-bold mb-3'>Featured products</h3>
          <ProductListingLayout>
            <>
              {featured.map((product) => (
                <ProductCard
                  key={product.ProductId}
                  categoryName={product.Category.CategoryName}
                  productId={product.ProductId}
                  productName={product.ProductName}
                  productPrice={product.ProductPrice!}
                  productPrimaryImage={product.ProductPrimaryImage}
                  supplierName={product.Supplier.SupplierName}
                  isPromotion={product.IsPromotion}
                  promotionPrice={
                    product.PromotionPrice || product.ProductPrice!
                  }
                />
              ))}
            </>
          </ProductListingLayout>
          <hr className='my-8' />
        </>
      )}

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
