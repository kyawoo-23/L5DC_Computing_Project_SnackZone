"use client";

import OrderSelectBox from "@/components/SelectBox/OrderSelectBox";
import { Admin, DeliveryService } from "@prisma/client";
import OrderConfirmButton from "./OrderConfirmButton";
import { acceptOrder, rejectOrder } from "@/app/actions/order-actions";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ClientAdminSelect({
  orderId,
  admins,
  deliveryServices,
}: {
  orderId: string;
  admins: Admin[];
  deliveryServices: DeliveryService[];
}) {
  const [isRejecting, setIsRejecting] = useState(false);
  const handleRejectOrder = async () => {
    setIsRejecting(true);
    const res = await rejectOrder(orderId);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setIsRejecting(false);
  };

  const handleAcceptOrder = async (formData: FormData) => {
    const AdminId = formData.get("Admin") as string;
    const DeliveryServiceId = formData.get("DeliveryService") as string;
    const res = await acceptOrder(AdminId, DeliveryServiceId, orderId);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form
      action={handleAcceptOrder}
      className='flex flex-col gap-3 border-2 border-white rounded p-8 w-fit'
    >
      <h3 className='text-white text-sm'>
        How do you want to process this order?
      </h3>

      <OrderSelectBox
        name='Admin'
        placeholder='Select admin'
        options={admins.map((admin) => ({
          label: admin.Name,
          value: admin.AdminId,
        }))}
      />
      <OrderSelectBox
        name='DeliveryService'
        placeholder='Select delivery service'
        options={deliveryServices.map((deliveryService) => ({
          label: deliveryService.DeliveryServiceName,
          value: deliveryService.DeliveryServiceId,
        }))}
      />

      <div className='flex items-center gap-3 ms-auto'>
        <button
          type='button'
          className={`bg-red-600 text-white text-sm rounded-md py-2 px-4 w-fit`}
          onClick={handleRejectOrder}
        >
          Reject
        </button>

        <OrderConfirmButton className='bg-primary' text='Accept order' />
      </div>
    </form>
  );
}
