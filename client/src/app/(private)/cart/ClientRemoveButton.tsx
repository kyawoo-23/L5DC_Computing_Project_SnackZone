"use client";
import { removeFromCart } from "@/app/actions/cart-actions";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

export default function ClientRemoveButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveWishList = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    const res = await removeFromCart(id);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  };

  return (
    <Button
      isIconOnly
      color='danger'
      variant='ghost'
      className='absolute top-3 right-3 z-10'
      size='sm'
      onClick={(e) => handleRemoveWishList(e)}
      isLoading={isLoading}
    >
      <FaTrash />
    </Button>
  );
}
