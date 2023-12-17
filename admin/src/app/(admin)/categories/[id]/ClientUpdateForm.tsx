"use client";

import { Switch } from "@/components/ui/switch";
import FormInputLabel from "@/components/Form/FormInputLabel";
import UpdateSubmitButtonGroup from "@/components/Buttons/UpdateSubmitButtonGroup";
import { updateCategory } from "@/app/actions/category-actions";
import toast from "react-hot-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { redirect } from "next/navigation";

interface dataProps {
  CategoryId: string;
  CategoryName: string;
  CategoryImage: string;
  IsActive: number;
}

const ClientUpdateForm = ({
  CategoryId,
  CategoryName,
  CategoryImage,
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

  const handleUpdateCategory = async (formData: FormData) => {
    const firstImage = formData.getAll("Image")[0];
    let categoryImage = null;

    if (firstImage instanceof File && firstImage.size > 0) {
      categoryImage = firstImage;
    }

    const updateData = {
      CategoryId: CategoryId,
      CategoryName: formData.get("Name") || CategoryName,
      IsActive: formData.get("IsActive") ? 1 : 0,
      OriginalImage: CategoryImage,
    };

    const updatedFormData = new FormData();
    Object.entries(updateData).forEach(([key, value]) => {
      updatedFormData.append(key, value.toString());
    });

    if (categoryImage) {
      updatedFormData.append("CategoryImage", categoryImage);
    } else {
      updatedFormData.append("CategoryImage", "");
    }

    const res = await updateCategory(updatedFormData);

    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/categories");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form
      action={handleUpdateCategory}
      className='border-2 border-white p-8 rounded-lg'
    >
      <Image
        src={CategoryImage}
        alt={CategoryName}
        width={80}
        height={80}
        className='bg-zinc-300 mt-3 rounded'
      />
      <FormInputLabel label='Name'>
        <Input
          type='text'
          placeholder={CategoryName}
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
