"use client";

import { createVariant } from "@/app/actions/variant-actions";
import SubmitButtonGroup from "@/components/Buttons/SubmitButtonGroup";
import FormHeader from "@/components/Form/FormHeader";
import FormInputLabel from "@/components/Form/FormInputLabel";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function VariantsCreatePage() {
  const handleCreateVariant = async (formData: FormData) => {
    const res = await createVariant(formData);
    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/variants");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <PageHeader title='Create Variant' />
      <div className='grid place-content-center'>
        <form
          action={handleCreateVariant}
          className='border-2 border-white p-8 rounded-lg'
        >
          <FormHeader title='create a new Variant' />
          <FormInputLabel label='Name'>
            <Input
              type='text'
              placeholder='Input Variant name'
              id='Name'
              name='Name'
              required
              className='form-input'
            />
          </FormInputLabel>
          <FormInputLabel label='Color'>
            <Input
              type='color'
              id='Color'
              name='Color'
              required
              className='form-input'
            />
          </FormInputLabel>
          <SubmitButtonGroup />
        </form>
      </div>
    </div>
  );
}
