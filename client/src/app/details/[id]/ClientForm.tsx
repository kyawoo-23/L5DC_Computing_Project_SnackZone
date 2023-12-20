"use client";
import { Button, Chip, Radio, RadioGroup, Tabs } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Tab } from "@headlessui/react";
import { IoCartOutline } from "react-icons/io5";

type ClientFormProps = {
  id: string;
  ProductVariants: {
    ProductVariantId: string;
    Variant: {
      VariantName: string;
      VariantColor: string;
    };
  }[];
  price: number | null;
  wholesalePrice: number | null;
  isPromotion: boolean;
  promotionPrice: number | null;
};

export default function ClientForm({
  ProductVariants,
  id,
  isPromotion,
  price,
  promotionPrice,
  wholesalePrice,
}: ClientFormProps) {
  const handleAddToCart = (formData: FormData) => {
    const variant = formData.get("variant");
    if (!variant) {
      toast.error("Please select a variant");
      return;
    }
    const quantity = formData.get("quantity");
    if (!quantity) {
      toast.error("Please select a quantity");
      return;
    }
  };

  return (
    <>
      <form action={handleAddToCart} className='flex flex-col gap-6'>
        <RadioGroup label='Flavors' className='mt-5' name='variant' isRequired>
          <div className='flex flex-wrap gap-4'>
            {ProductVariants.map((variant) => (
              <Radio
                className='inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse w-fit cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent data-[selected=true]:border-primary'
                value={variant.ProductVariantId}
                key={variant.ProductVariantId}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className='w-5 h-5 rounded-full border-2 border-slate-400'
                    style={{
                      backgroundColor: variant.Variant.VariantColor,
                    }}
                  ></div>
                  {variant.Variant.VariantName}
                </div>
              </Radio>
            ))}
          </div>
        </RadioGroup>

        <Tab.Group>
          <Tab.List className='flex space-x-2'>
            <Tab className='ui-selected:bg-slate-300 ui-selected:text-black ui-not-selected:text-white px-3 py-2 rounded-lg'>
              Retail
            </Tab>
            <Tab
              className='ui-selected:bg-slate-300 ui-selected:text-black ui-not-selected:text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={isPromotion}
            >
              Wholesale
            </Tab>
          </Tab.List>
          <Tab.Panels className=''>
            <Tab.Panel className=''>
              <p className='text-xl font-semibold'>${price}</p>
            </Tab.Panel>
            <Tab.Panel className=''>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <Button className='w-fit rounded-lg' type='submit'>
          <IoCartOutline /> Add to cart
        </Button>
      </form>
    </>
  );
}
