"use client";

import { Switch } from "@/components/ui/switch";
import FormInputLabel from "@/components/Form/FormInputLabel";
import UpdateSubmitButtonGroup from "@/components/Buttons/UpdateSubmitButtonGroup";
import { updateSupplier } from "@/app/actions/supplier-actions";
import toast from "react-hot-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { redirect } from "next/navigation";

interface dataProps {
  SupplierId: string;
  SupplierName: string;
  SupplierImage: string;
  IsActive: number;
}

const ClientUpdateForm = ({
  SupplierId,
  SupplierName,
  SupplierImage,
  IsActive,
}: dataProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

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

  const handleUpdateSupplier = async (formData: FormData) => {
    const firstImage = formData.getAll("Image")[0];
    let supplierImage = null;

    if (firstImage instanceof File && firstImage.size > 0) {
      supplierImage = firstImage;
    }

    const updateData = {
      SupplierId: SupplierId,
      SupplierName: formData.get("Name") || SupplierName,
      IsActive: formData.get("IsActive") ? 1 : 0,
      OriginalImage: SupplierImage,
    };

    const updatedFormData = new FormData();
    Object.entries(updateData).forEach(([key, value]) => {
      updatedFormData.append(key, value.toString());
    });

    if (supplierImage) {
      updatedFormData.append("SupplierImage", supplierImage);
    } else {
      updatedFormData.append("SupplierImage", "");
    }

    const res = await updateSupplier(updatedFormData);

    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/suppliers");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form
      action={handleUpdateSupplier}
      className='border-2 border-white p-8 rounded-lg'
    >
      <Image
        src={SupplierImage}
        alt={SupplierName}
        width={80}
        height={80}
        className='bg-zinc-300 mt-3 rounded'
      />
      <FormInputLabel label='Name'>
        <Input
          type='text'
          placeholder={SupplierName}
          id='Name'
          name='Name'
          className='form-input'
        />
      </FormInputLabel>
      <FormInputLabel label='Image'>
        <Input
          type='file'
          id='Image'
          name='Image'
          className='form-input'
          accept='image/*'
          onChange={handleFileChange}
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
      <div className='flex items-center gap-4 mt-5'>
        <label htmlFor='IsActive' className='text-white text-sm'>
          Status
        </label>
        <div className='bg-zinc-600 rounded-full p-1 pb-0'>
          <Switch defaultChecked={IsActive ? true : false} name='IsActive' />
        </div>
      </div>
      <UpdateSubmitButtonGroup />
    </form>
  );
};

export default ClientUpdateForm;
