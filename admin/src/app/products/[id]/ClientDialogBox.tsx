"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProductImage } from "@/app/actions/product-actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

interface ClientDialogBox {
  id: string;
  imgUrl: string;
  productId: string;
}

export default function ClientDialogBox({
  id,
  imgUrl,
  productId,
}: ClientDialogBox) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteImage = async () => {
    setIsLoading(true);
    const res = await deleteProductImage(id, imgUrl, productId);
    if (res.isSuccess) {
      toast.success(res.message);
      setIsLoading(false);
      router.push(`/products/${productId}`);
    } else {
      toast.error(res.message);
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='w-full rounded-t-none hover:ring'>
          <Trash2Icon size={16} className='me-2' />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. <br />
            This will permanently delete the selected product image.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='hover:bg-transparent hover:ring'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='hover:ring'
            disabled={isLoading}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              handleDeleteImage();
            }}
          >
            {isLoading && <ClipLoader size={20} className='me-2' />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
