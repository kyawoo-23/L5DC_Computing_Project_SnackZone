import ProductCard from "@/components/Card/ProductCard";
import { prisma } from "@/lib/prisma";

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
    </div>
  );
}
