"use client";
import { useFormStatus } from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function OrderConfirmButton({
  className,
  text,
}: {
  className: string;
  text: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className={`${className} text-white text-sm rounded-md py-2 px-4 w-fit`}
      disabled={pending}
    >
      {pending && <ClipLoader size={20} className='me-2' />}
      {text}
    </button>
  );
}
