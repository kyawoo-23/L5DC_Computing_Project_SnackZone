import { PAGE_COUNT } from "@/app/constants";
import ProductCard from "@/components/Card/ProductCard";
import ProductListingLayout from "@/components/Layout/ProductListingLayout";
import LoadMore from "./LoadMore";
import { prisma } from "@/lib/prisma";
import PageTitle from "@/components/Heading/PageTitle";

export default async function SearchPage({
  params,
}: {
  params: { query: string };
}) {
  const data = await prisma?.product.findMany({
    where: {
      ProductName: {
        contains: params.query,
      },
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
    <div>
      <PageTitle title={`Search results for "${params.query}"`} />
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
      <LoadMore query={params.query} />
    </div>
  );
}
