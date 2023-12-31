"use client";

import { createSupplier } from "@/app/actions/supplier-actions";
import SubmitButtonGroup from "@/components/Buttons/SubmitButtonGroup";
import FormHeader from "@/components/Form/FormHeader";
import FormInputLabel from "@/components/Form/FormInputLabel";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function SuppliersCreatePage() {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSupplier = async (formData: FormData) => {
    const res = await createSupplier(formData);
    if (res.isSuccess) {
      // formRef.current?.reset();
      toast.success(res.message);
      redirect("/suppliers");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <PageHeader title='Create Supplier' />
      <div className='grid place-content-center'>
        <form
          ref={formRef}
          action={handleCreateSupplier}
          className='border-2 border-white p-8 rounded-lg'
          onReset={() => setImagePreview(undefined)}
        >
          <FormHeader title='create a new Supplier' />
          <FormInputLabel label='Name'>
            <Input
              type='text'
              placeholder='Input Supplier name'
              id='Name'
              name='Name'
              required
              className='form-input'
            />
          </FormInputLabel>
          <FormInputLabel label='Image'>
            <Input
              type='file'
              id='Image'
              name='Image'
              required
              accept='image/*'
              onChange={handleFileChange}
              className='form-input'
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt='Preview'
                width={80}
                height={80}
                className='object-cover rounded bg-zinc-300 mt-1'
              />
            )}
          </FormInputLabel>
          <SubmitButtonGroup />
        </form>
      </div>
    </div>
  );
}
