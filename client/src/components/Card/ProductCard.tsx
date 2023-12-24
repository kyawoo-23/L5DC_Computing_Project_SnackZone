"use client";

import { Button } from "@nextui-org/button";
import { CardFooter, Chip, Image, Link } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import WishListButton from "@/components/Button/WishListButton";
import { getCookie } from "cookies-next";
import { checkProductInWishList } from "@/app/actions/wishlist-actions";
import { useEffect, useState } from "react";

interface ProductCardProps {
  supplierName: string;
  categoryName: string;
  productName: string;
  productPrice: number;
  productPrimaryImage: string;
  productId: string;
  isPromotion: number;
  promotionPrice: number;
}

export default function ProductCard({
  categoryName,
  productId,
  productName,
  productPrice,
  productPrimaryImage,
  supplierName,
  isPromotion,
  promotionPrice,
}: ProductCardProps) {
  const token = getCookie("token") as string;
  const [isWishListed, setIsWishListed] = useState(false);
  const [wishListProductId, setWishListProductId] = useState(null);

  useEffect(() => {
    if (token) {
      const check = async () => {
        const res = await checkProductInWishList(productId);
        if (res.isSuccess && res.data) {
          setIsWishListed(true);
          setWishListProductId(res.data);
        }
      };
      check();
    }
  }, [token, productId]);

  return (
    <Card className='py-4 w-fit'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <div className='flex justify-between w-full'>
          <div>
            <p className='text-xs uppercase font-bold'>{supplierName}</p>
            <small className='text-default-500'>
              <Chip size='sm' className='mt-2 mb-1 px-2'>
                {categoryName}
              </Chip>
            </small>
          </div>
          <div>
            <WishListButton
              productId={productId}
              isWishListed={isWishListed}
              wishListProductId={wishListProductId}
            />
          </div>
        </div>
        <h4 className='font-bold text-lg'>{productName}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          alt='Card background'
          className='object-cover rounded-xl h-[220px] border-2 border-gray-800'
          src={productPrimaryImage}
          width={200}
        />
      </CardBody>
      <CardFooter>
        <div className='flex justify-between items-center w-full'>
          <div className='flex gap-3 items-center'>
            <p
              className={`text-sm uppercase font-bold ${
                isPromotion && "line-through text-xs"
              }`}
            >
              ${productPrice}
            </p>
            {isPromotion ? (
              <Chip color='secondary' size='sm' className='px-2'>
                <span className='font-bold'>${promotionPrice}</span>
              </Chip>
            ) : null}
          </div>

          <Button as={Link} size='sm' href={`/details/${productId}`}>
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
