"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <div className='mt-8 flex items-center justify-end gap-2'>
      <Button variant='secondary' type='submit' disabled={pending}>
        {pending && <ClipLoader size={20} className='me-2' />}
        {text}
      </Button>
    </div>
  );
};

export default SubmitButton;
