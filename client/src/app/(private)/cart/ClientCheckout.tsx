"use client";
import { Button, Checkbox, Image, Input, Textarea } from "@nextui-org/react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { Prisma } from "@prisma/client";
import ConfirmBox from "@/components/Dialog/ConfirmBox";
import { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import toast from "react-hot-toast";
import { checkoutCart } from "@/app/actions/cart-actions";
import KbzPay from "/public/kbz-pay.jpg";

type ClientCheckoutProps = {
  data: Prisma.CartProductGetPayload<{
    include: {
      Product: {
        include: {
          Supplier: true;
        };
      };
      ProductVariant: {
        include: {
          Variant: true;
        };
      };
    };
  }>[];
  info: Prisma.CustomerGetPayload<{}>;
};

export default function ClientCheckout({ data, info }: ClientCheckoutProps) {
  const DELIVERY_FEE = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [phone, setPhone] = useState(info.CustomerPhone || "");
  const [address, setAddress] = useState(info.CustomerAddress || "");
  const [prepaidFile, setPrepaidFile] = useState<File | null>(null);

  const handleCheckout = async () => {
    if (isSelected && !prepaidFile) {
      toast.error("Please upload your prepaid voucher");
      return;
    }

    const orderData = {
      CustomerPhone: phone,
      CustomerAddress: address,
      IsPrepaid: isSelected ? 1 : 0,
      TotalPrice: data.reduce((total, item) => {
        const price =
          item.PurchaseType === "wholesale"
            ? item.Product.WholesalePrice! * item.Product.ProductPackingQuantity
            : item.Product.IsPromotion === 1
            ? item.Product.PromotionPrice!
            : item.Product.ProductPrice!;
        return total + item.ProductQuantity * price;
      }, DELIVERY_FEE),
      formData: (() => {
        const formData = new FormData();
        formData.append("prepaidFile", prepaidFile!);
        return formData;
      })(),
    };
    const res = await checkoutCart(orderData);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className='flex justify-end'>
        <Button className='w-fit' onClick={() => setIsDialogOpen(true)}>
          <MdShoppingCartCheckout />
          Proceed to checkout ($
          {data &&
            data.length > 0 &&
            data.reduce((total, item) => {
              const price =
                item.PurchaseType === "wholesale"
                  ? item.Product.WholesalePrice! *
                    item.Product.ProductPackingQuantity
                  : item.Product.IsPromotion === 1
                  ? item.Product.PromotionPrice!
                  : item.Product.ProductPrice!;
              return total + item.ProductQuantity * price;
            }, 0)}
          )
        </Button>
      </div>

      <ConfirmBox
        buttonLabel='Confirm'
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title='Checkout confirmation'
        onAction={handleCheckout}
      >
        <div className='flex flex-col gap-6'>
          <Input
            type='tel'
            label='Contact number'
            placeholder='Enter your phone number here'
            labelPlacement='outside'
            isRequired
            required
            startContent={
              <FaPhone className='text-default-400 pointer-events-none flex-shrink-0' />
            }
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Textarea
            isRequired
            required
            label='Shipping address'
            labelPlacement='outside'
            placeholder='Enter your address here'
            classNames={{
              input: "min-h-[100px]",
            }}
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Checkbox
            isSelected={isSelected}
            onValueChange={setIsSelected}
            size='sm'
            name='isPrepaid'
          >
            Pay in advance
          </Checkbox>

          {isSelected && (
            <>
              <Image src={KbzPay.src} alt='kbz pay' width={250} height={250} />
              <small>
                Please input the screenshot of the payment after the transaction
                to our KBZ Pay account <i>(09795559054)</i>
              </small>
              <input
                id='fileInput'
                type='file'
                className='bg-[#27272a] rounded-lg py-2 px-2 text-sm text-gray-400 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Choose a file'
                name='prepaidFile'
                accept='image/*'
                onChange={(e) => setPrepaidFile(e.target.files![0])}
              />
            </>
          )}

          <div className='flex flex-col gap-2'>
            <span className='text-right text-sm'>
              Delivery fees: ${DELIVERY_FEE}
            </span>
            <span className='text-right text-sm'>
              Total amount: $
              {data.reduce((total, item) => {
                const price =
                  item.PurchaseType === "wholesale"
                    ? item.Product.WholesalePrice! *
                      item.Product.ProductPackingQuantity
                    : item.Product.IsPromotion === 1
                    ? item.Product.PromotionPrice!
                    : item.Product.ProductPrice!;
                return total + item.ProductQuantity * price;
              }, DELIVERY_FEE)}
            </span>
          </div>
        </div>
      </ConfirmBox>
    </>
  );
}
