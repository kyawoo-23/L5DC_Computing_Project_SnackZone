import { PAGE_COUNT } from "@/app/constants";
import ProductCard from "@/components/Card/ProductCard";
import ProductListingLayout from "@/components/Layout/ProductListingLayout";
import { prisma } from "@/lib/prisma";
import LoadMore from "./LoadMore";
import PageTitle from "@/components/Heading/PageTitle";

export default async function SupplierDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.product.findMany({
    where: {
      SupplierId: params.id,
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
      <PageTitle title={`Supplier: ${data[0].Supplier.SupplierName}`} />
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
      <LoadMore supplierId={params.id} />
    </>
  );
}
