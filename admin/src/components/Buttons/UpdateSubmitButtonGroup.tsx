"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const UpdateSubmitButtonGroup = () => {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <div className='mt-8 flex items-center justify-end gap-2'>
      <Button
        type='button'
        variant='ghost'
        className='text-gray-300'
        onClick={router.back}
      >
        Cancel
      </Button>
      <Button variant='secondary' type='submit' disabled={pending}>
        {pending && <ClipLoader size={20} className='me-2' />}
        Update
      </Button>
    </div>
  );
};

export default UpdateSubmitButtonGroup;
