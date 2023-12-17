"use client";

import {
  createPurchase,
  searchProductVariant,
} from "@/app/actions/purchase-actions";
import SubmitButton from "@/components/Buttons/SubmitButton";
import FormHeader from "@/components/Form/FormHeader";
import FormInputLabel from "@/components/Form/FormInputLabel";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Select, { SelectInstance } from "react-select";

interface ClientCreatePageProps {
  products: Product[];
}

export default function ClientPurchaseCreatePage({
  products,
}: ClientCreatePageProps) {
  const selectRef = useRef<SelectInstance>(null);
  const [isGettingVariants, setIsGettingVariants] = useState(false);
  const [productVariants, setProductVariants] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const handleCreateProduct = async (formData: FormData) => {
    const res = await createPurchase(formData);
    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/purchase");
    } else {
      toast.error(res.message);
    }
  };

  const handleSearchProductVariant = async (value: string) => {
    setIsGettingVariants(true);
    const res = await searchProductVariant(value);

    if (!res.isSuccess) {
      toast.error(res.message);
    } else {
      setProductVariants(
        res.data?.map((product) => {
          return {
            label: product.Variant.VariantName,
            value: product.ProductVariantId,
          };
        }) || []
      );
    }

    selectRef.current?.clearValue();
    setIsGettingVariants(false);
  };

  return (
    <div>
      <PageHeader title='Create Purchase' />
      <div className='grid place-content-center'>
        <form
          action={handleCreateProduct}
          className='border-2 border-white p-8 rounded-lg mx-auto'
        >
          <FormHeader title='make a new Purchase' />

          <FormInputLabel label='Select Product'>
            <Select
              name='Product'
              isSearchable
              required
              options={products.map((product) => ({
                label: product.ProductName,
                value: product.ProductId,
              }))}
              onChange={(e) => handleSearchProductVariant(e!.value)}
            />
          </FormInputLabel>

          <FormInputLabel label='Select Product Variant'>
            <Select
              ref={selectRef}
              isDisabled={productVariants.length === 0}
              name='ProductVariant'
              isSearchable
              required
              options={productVariants.map((variant) => ({
                label: variant.label,
                value: variant.value,
              }))}
            />
            {productVariants.length === 0 && !isGettingVariants && (
              <p className='text-white'>
                Please choose a product to select variant
              </p>
            )}
            {isGettingVariants && (
              <p className='text-white'>Getting variants...</p>
            )}
          </FormInputLabel>

          <FormInputLabel label='Price'>
            <Input
              type='number'
              placeholder='Input product price'
              id='Price'
              name='Price'
              required
              min={1}
              className='form-input'
            />
          </FormInputLabel>

          <FormInputLabel label='Quantity'>
            <Input
              type='number'
              placeholder='Input product quantity'
              id='Quantity'
              name='Quantity'
              required
              min={1}
              className='form-input'
            />
          </FormInputLabel>

          <FormInputLabel label='Expire Date'>
            <Input
              type='date'
              placeholder='Input expire date'
              id='Expiry'
              name='Expiry'
              required
              className='form-input'
              min={new Date().toISOString().split("T")[0]}
            />
          </FormInputLabel>

          <SubmitButton text='Make Purchase' />
        </form>
      </div>
    </div>
  );
}
