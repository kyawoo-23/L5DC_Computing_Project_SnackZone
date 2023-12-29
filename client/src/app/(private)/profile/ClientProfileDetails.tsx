"use client";

import { updateProfile } from "@/app/actions/profile-actions";
import SubmitButton from "@/components/Button/SubmitButton";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type ClientProfileDetailsProps = {
  name: string;
  email: string;
  address: string | null;
  phone: string | null;
};

export default function ClientProfileDetails({
  address,
  email,
  name,
  phone,
}: ClientProfileDetailsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleUpdateProfile = async (formData: FormData) => {
    const updateData = {
      name: formData.get("name") || name,
      email: formData.get("email") || email,
      password: formData.get("password") || null,
      phone: formData.get("phone") || phone,
      address: formData.get("address") || address,
    };

    const updatedFormData = new FormData();
    Object.entries(updateData).forEach(([key, value]) => {
      updatedFormData.append(key, value?.toString() || "");
    });

    const res = await updateProfile(updatedFormData);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <form action={handleUpdateProfile}>
      <div className='grid grid-cols-2 gap-3'>
        <Input
          size='sm'
          type='text'
          placeholder={name}
          value={name}
          name='name'
          label='User name'
          readOnly
        />
        <Input
          size='sm'
          type='email'
          placeholder={email}
          name='email'
          label='Email'
        />
        <Input
          size='sm'
          label='Password'
          name='password'
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <FaEye className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Input
          size='sm'
          type='tel'
          placeholder={phone || ""}
          name='phone'
          label='Phone'
        />
        <Textarea
          className='col-span-2'
          label='Address'
          size='sm'
          placeholder={address || ""}
          name='address'
        />
      </div>
      <div className='w-full flex justify-end mt-4'>
        <SubmitButton label='Update profile' />
      </div>
    </form>
  );
}
