"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const SubmitButtonGroup = () => {
  const { pending } = useFormStatus();

  return (
    <div className='mt-8 flex items-center justify-end gap-2'>
      <Button variant='ghost' type='reset' className='text-gray-300'>
        Reset
      </Button>
      <Button variant='secondary' type='submit' disabled={pending}>
        {pending ? (
          <ClipLoader size={20} className='me-2' />
        ) : (
          <Plus size={20} className='me-2' />
        )}
        Create
      </Button>
    </div>
  );
};

export default SubmitButtonGroup;
