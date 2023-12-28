"use client";

import {
  addToWishList,
  removeFromWishList,
} from "@/app/actions/wishlist-actions";
import { Button } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

type WishListButtonProps = {
  productId: string;
  isWishListed: boolean;
  wishListProductId: string | null;
};

export default function WishListButton({
  isWishListed,
  productId,
  wishListProductId,
}: WishListButtonProps) {
  const router = useRouter();
  const [initState, setInitState] = useState(isWishListed);
  const [isLoading, setIsLoading] = useState(false);
  const [newWishListProductId, setNewWishListProductId] =
    useState(wishListProductId);

  const handleWishList = async () => {
    const token = getCookie("cus-token") as string;
    if (!token) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    if (initState) {
      if (newWishListProductId) {
        const res = await removeFromWishList(newWishListProductId);
        if (res.isSuccess) {
          setInitState(false);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      }
    } else {
      const res = await addToWishList(productId);
      if (res.isSuccess) {
        setNewWishListProductId(res.data);
        setInitState(true);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setInitState(isWishListed);
  }, [isWishListed]);

  useEffect(() => {
    setNewWishListProductId(wishListProductId);
  }, [wishListProductId]);

  return (
    <>
      <Button
        isIconOnly
        size='sm'
        aria-label='Wishlist'
        onClick={handleWishList}
        isLoading={isLoading}
      >
        {initState ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
      </Button>
    </>
  );
}
