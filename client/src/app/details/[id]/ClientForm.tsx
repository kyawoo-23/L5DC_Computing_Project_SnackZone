"use client";
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { Tab } from "@headlessui/react";
import { IoCartOutline } from "react-icons/io5";
import { IoMdPricetag, IoMdPricetags } from "react-icons/io";
import { ChangeEvent, useState } from "react";
import { addToCart } from "@/app/actions/cart-actions";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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
  packingQuantity: number;
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
  packingQuantity,
}: ClientFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [retailPrice, setRetailPrice] = useState(0);
  const [wsPrice, setWsPrice] = useState(0);
  const [type, setType] = useState<"retail" | "wholesale">("retail");

  const handleRetailPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value) + 1;
    if (isPromotion && promotionPrice) {
      setRetailPrice(promotionPrice * selectedValue);
    } else if (price) {
      setRetailPrice(price * selectedValue);
    }
  };

  const handleWholesalePrice = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value) + 1;
    if (wholesalePrice) {
      setWsPrice(wholesalePrice * selectedValue * packingQuantity);
    }
  };

  const handleTabChange = (i: number) => {
    if (i === 0) {
      setRetailPrice(0);
      setType("retail");
    } else if (i === 1) {
      setWsPrice(0);
      setType("wholesale");
    }
  };

  const handleAddToCart = async (formData: FormData) => {
    const token = getCookie("cus-token") as string;
    if (!token) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    const variant = formData.get("variant") as string;
    const retailQty = parseInt(formData.get("retailQty") as string) + 1;
    const wholesaleQty = parseInt(formData.get("wholesaleQty") as string) + 1;

    if (!variant) {
      toast.error("Please select a flavor");
      setIsLoading(false);
      return;
    }
    if (type === "retail" && (retailPrice === 0 || retailQty === 0)) {
      toast.error("Please select a quantity");
      setIsLoading(false);
      return;
    } else if (type === "wholesale" && (wsPrice === 0 || wholesaleQty === 0)) {
      toast.error("Please select a quantity");
      setIsLoading(false);
      return;
    }
    console.log(variant, retailQty, wholesaleQty);
    console.log(type, retailPrice, wsPrice);

    const res = await addToCart({
      productId: id,
      productVariantId: variant,
      quantity: type === "retail" ? retailQty : wholesaleQty,
      purchaseType: type === "retail" ? "retail" : "wholesale",
    });
    if (res) {
      toast.success("Added to cart");
    } else {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <>
      <form action={handleAddToCart} className='flex flex-col gap-6'>
        <RadioGroup label='Flavors' className='mt-5' name='variant' isRequired>
          <div className='flex flex-wrap gap-4'>
            {ProductVariants.map((variant) => (
              <Radio
                className='inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse w-fit cursor-pointer rounded-lg gap-4 py-2 border-2 border-transparent data-[selected=true]:border-primary'
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

        <Tab.Group onChange={(i) => handleTabChange(i)}>
          <Tab.List className='flex space-x-2'>
            <Tab className='ui-selected:bg-slate-300 ui-selected:text-black ui-not-selected:text-white px-3 py-1 rounded-lg flex items-center gap-2'>
              <IoMdPricetag />
              Retail
            </Tab>
            <Tab
              className='ui-selected:bg-slate-300 ui-selected:text-black ui-not-selected:text-white px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
              disabled={isPromotion || !wholesalePrice}
            >
              <IoMdPricetags />
              Wholesale
            </Tab>
          </Tab.List>
          <Tab.Panels className=''>
            <Tab.Panel>
              <div className='flex gap-3 items-center'>
                <p
                  className={`font-semibold ${
                    isPromotion ? "line-through text-md" : "text-xl"
                  }`}
                >
                  ${price}
                </p>
                {isPromotion && (
                  <p className='text-xl font-semibold'>${promotionPrice}</p>
                )}
              </div>
              <div className='flex gap-3 items-center mt-3'>
                <Select
                  size={"sm"}
                  label='Select quantity'
                  className='w-40'
                  name='retailQty'
                  onChange={(e) => handleRetailPrice(e)}
                >
                  {[...Array(packingQuantity)].map((_, i) => (
                    <SelectItem
                      key={i}
                      value={i + 1}
                      textValue={(i + 1).toString()}
                    >
                      {i + 1}
                    </SelectItem>
                  ))}
                </Select>
                <div>
                  <span>
                    Amount: <b>${retailPrice}</b>
                  </span>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel className=''>
              <div className='flex gap-3 items-center'>
                <p className='text-xl font-semibold'>${wholesalePrice}</p>
              </div>
              <div className='flex gap-3 items-center mt-3'>
                <Select
                  size={"sm"}
                  label='Select quantity'
                  className='w-52'
                  name='wholesaleQty'
                  onChange={(e) => handleWholesalePrice(e)}
                >
                  {[...Array(20)].map((_, i) => (
                    <SelectItem
                      key={i}
                      value={i + 1}
                      textValue={(i + 1).toString()}
                    >
                      {i + 1} ctns | ({packingQuantity * (i + 1)} pcs)
                    </SelectItem>
                  ))}
                </Select>
                <div>
                  <span>
                    Amount: <b>${wsPrice}</b>
                  </span>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <Button
          className='w-fit rounded-lg'
          type='submit'
          isLoading={isLoading}
        >
          <IoCartOutline /> Add to cart
        </Button>
      </form>
    </>
  );
}
