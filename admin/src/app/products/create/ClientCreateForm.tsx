"use client";

import { createProduct } from "@/app/actions/product-actions";
import SubmitButtonGroup from "@/components/Buttons/SubmitButtonGroup";
import FormHeader from "@/components/Form/FormHeader";
import FormInputLabel from "@/components/Form/FormInputLabel";
import PageHeader from "@/components/PageHeader/PageHeader";
import SelectBox from "@/components/SelectBox/SelectBox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Supplier, Category, Variant } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

interface ClientProductsCreatePageProps {
  suppliers: Supplier[];
  categories: Category[];
  variants: Variant[];
}

export default function ClientProductsCreatePage({
  suppliers,
  categories,
  variants,
}: ClientProductsCreatePageProps) {
  const [primaryImagePreview, setPrimaryImagePreview] = useState<
    string | undefined
  >(undefined);
  const [imagePreview, setImagePreview] = useState<string[] | undefined>(
    undefined
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray: File[] = Array.from(event.target.files);
      const filePreviews: string[] = [];

      const readFile = (index: number) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          filePreviews.push(reader.result as string);

          if (index + 1 < filesArray.length) {
            // Read the next file recursively
            readFile(index + 1);
          } else {
            // If all files have been read, update state with previews
            setImagePreview(filePreviews);
          }
        };
        reader.readAsDataURL(filesArray[index]);
      };
      // Start reading the first file
      readFile(0);
    }
  };

  const handlePrimaryFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrimaryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = async (formData: FormData) => {
    const res = await createProduct(formData);
    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/products");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <PageHeader title='Create Product' />
      <div className='grid place-content-center'>
        <form
          ref={formRef}
          action={handleCreateProduct}
          className='border-2 border-white p-8 rounded-lg grid grid-cols-2 gap-8 min-w-[1000px] max-w-[1000px] mx-auto'
          onReset={() => {
            setPrimaryImagePreview(undefined);
            setImagePreview(undefined);
          }}
        >
          <div className='col-span-2'>
            <FormHeader title='create a new Product' />
          </div>

          <FormInputLabel label='Name'>
            <Input
              type='text'
              placeholder='Input product name'
              id='Name'
              name='Name'
              required
              className='form-input'
            />
          </FormInputLabel>

          <FormInputLabel label='Weight'>
            <Input
              type='number'
              placeholder='Input product weight'
              id='Weight'
              name='Weight'
              required
              className='form-input'
              min={1}
            />
          </FormInputLabel>

          <div className='col-span-2'>
            <FormInputLabel label='Description'>
              <Textarea
                placeholder='Input product description'
                id='Description'
                name='Description'
                required
                className='form-input resize-none'
                rows={4}
              />
            </FormInputLabel>
          </div>

          <div className='col-span-2'>
            <FormInputLabel label='Primary Image'>
              <Input
                type='file'
                id='PrimaryImage'
                name='PrimaryImage'
                required
                accept='image/*'
                onChange={handlePrimaryFileChange}
                className='form-input'
              />
              {primaryImagePreview && (
                <Image
                  src={primaryImagePreview}
                  alt='Preview'
                  width={180}
                  height={240}
                  className='object-cover rounded bg-zinc-300 mt-1'
                />
              )}
            </FormInputLabel>
          </div>

          <div className='col-span-2'>
            <FormInputLabel label='Images'>
              <Input
                type='file'
                id='ImageList'
                name='ImageList'
                required
                accept='image/*'
                onChange={handleFileChange}
                className='form-input'
                multiple
              />
              {imagePreview && imagePreview.length > 0 && (
                <div className='flex gap-3 overflow-x-auto'>
                  {imagePreview.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview}
                      alt='Preview'
                      width={180}
                      height={240}
                      className='object-cover rounded bg-zinc-300 mt-1'
                    />
                  ))}
                </div>
              )}
            </FormInputLabel>
          </div>

          <FormInputLabel label='Quantity per carton'>
            <Input
              type='number'
              placeholder='Input product package quantity'
              id='Quantity'
              name='Quantity'
              required
              className='form-input'
              min={1}
            />
          </FormInputLabel>

          <FormInputLabel label='Suppliers'>
            <SelectBox
              name='SupplierId'
              placeholder='Select supplier'
              options={suppliers.map((supplier) => ({
                label: supplier.SupplierName,
                value: supplier.SupplierId,
              }))}
            />
          </FormInputLabel>

          <FormInputLabel label='Categories'>
            <SelectBox
              name='CategoryId'
              placeholder='Select category'
              options={categories.map((category) => ({
                label: category.CategoryName,
                value: category.CategoryId,
              }))}
            />
          </FormInputLabel>

          <FormInputLabel label='Variants'>
            <Select
              isMulti
              name='Variants'
              isSearchable
              required
              options={variants.map((variant) => ({
                label: variant.VariantName,
                value: variant.VariantId,
              }))}
            />
          </FormInputLabel>

          <div className='col-span-2'>
            <SubmitButtonGroup />
          </div>
        </form>
      </div>
    </div>
  );
}
