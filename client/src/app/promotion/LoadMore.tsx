"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import ProductCard from "@/components/Card/ProductCard";
import Loader from "@/components/Loading/Loader";
import ProductListingLayout from "@/components/Layout/ProductListingLayout";
import { fetchProductByPromotion } from "../actions/promotion-actions";

let page = 1;

function LoadMore() {
  const { ref, inView } = useInView();

  const [data, setData] = useState<
    Prisma.ProductGetPayload<{
      include: {
        Category: true;
        Supplier: true;
      };
    }>[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [endOfPage, setEndOfPage] = useState(false);

  useEffect(() => {
    if (!endOfPage) {
      if (inView) {
        setIsLoading(true);
        // Add a delay of 500 milliseconds
        const delay = 500;

        const timeoutId = setTimeout(() => {
          fetchProductByPromotion(page).then((res) => {
            if (res.data.length === 0) {
              setEndOfPage(true);
              setIsLoading(false);
              return;
            }
            setData([...data, ...res.data]);
            page++;
          });

          setIsLoading(false);
        }, delay);

        // Clear the timeout if the component is unmounted or inView becomes false
        return () => clearTimeout(timeoutId);
      }
    }
  }, [inView, data, isLoading, endOfPage]);

  return (
    <>
      <ProductListingLayout>
        <>
          {data.map((product) => (
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

      <section className='flex justify-center items-center w-full'>
        <div ref={ref} className='my-3'>
          {inView && isLoading && <Loader />}
          {endOfPage && !isLoading && (
            <p className='mt-4'>You have reached the end!</p>
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
