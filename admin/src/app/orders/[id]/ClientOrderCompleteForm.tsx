"use client";

import { completeOrder, rejectOrder } from "@/app/actions/order-actions";
import toast from "react-hot-toast";

export default function ClientOrderCompleteForm({ id }: { id: string }) {
  const handleCancelOrder = async () => {
    const res = await rejectOrder(id);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleCompleteOrder = async () => {
    const res = await completeOrder(id);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          onClick={handleCancelOrder}
          className='btn bg-red-600 text-white px-6 py-4 rounded'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={handleCompleteOrder}
          className='btn bg-green-600 text-white px-6 py-4 rounded'
        >
          Complete order
        </button>
      </div>
    </>
  );
}
