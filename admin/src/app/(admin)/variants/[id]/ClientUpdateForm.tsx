"use client";

import FormInputLabel from "@/components/Form/FormInputLabel";
import UpdateSubmitButtonGroup from "@/components/Buttons/UpdateSubmitButtonGroup";
import { updateVariant } from "@/app/actions/variant-actions";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";

interface dataProps {
  VariantId: string;
  VariantName: string;
  VariantColor: string;
}

const ClientUpdateForm = ({
  VariantId,
  VariantName,
  VariantColor,
}: dataProps) => {
  const [vColor, setVColor] = useState(VariantColor);

  const handleUpdateVariant = async (formData: FormData) => {
    const updateData = {
      VariantId: VariantId,
      VariantName: formData.get("Name") || VariantName,
      VariantColor: vColor || VariantColor,
    };

    const updatedFormData = new FormData();
    Object.entries(updateData).forEach(([key, value]) => {
      updatedFormData.append(key, value.toString());
    });

    const res = await updateVariant(updatedFormData);

    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/variants");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form
      action={handleUpdateVariant}
      className='border-2 border-white p-8 rounded-lg'
    >
      <FormInputLabel label='Name'>
        <Input
          type='text'
          placeholder={VariantName}
          id='Name'
          name='Name'
          className='form-input'
        />
      </FormInputLabel>
      <FormInputLabel label='Color'>
        <Input
          type='color'
          id='Name'
          name='Name'
          className='form-input'
          value={vColor}
          onChange={(e) => setVColor(e.target.value)}
        />
      </FormInputLabel>
      <UpdateSubmitButtonGroup />
    </form>
  );
};

export default ClientUpdateForm;
