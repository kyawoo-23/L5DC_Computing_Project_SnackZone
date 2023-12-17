"use client";

import SubmitButton from "@/components/Buttons/SubmitButton";
import FormInputLabel from "@/components/Form/FormInputLabel";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { login } from "@/app/actions/login-actions";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import Image from "next/image";
import SnackZone from "@/assets/Snack Zone Logo.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (formData: FormData) => {
    const res = await login(formData);
    if (res.isSuccess) {
      setCookie("token", res.data.id);
      setCookie("name", res.data.name);
      setCookie("role", res.data.role);
      toast.success(res.message);
      redirect("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='grid place-items-center h-[90vh]'>
      <form
        action={handleLogin}
        className='flex flex-col gap-4 p-10 border-2 rounded-lg'
      >
        <Image
          priority
          quality={100}
          src={SnackZone}
          width={600}
          height={460}
          alt='Snack Zone logo'
          className='w-full h-[155px] object-center object-cover rounded'
        />
        <h3 className='text-2xl text-white font-bold'>
          Login to Admin dashboard
        </h3>

        <FormInputLabel label='Email'>
          <Input
            type='email'
            placeholder={"Enter you email address"}
            id='Email'
            name='Email'
            className='form-input'
            required
          />
        </FormInputLabel>

        <FormInputLabel label='Password'>
          <div className='relative'>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={"Enter you password"}
              id='Password'
              name='Password'
              className='form-input'
              required
            />
            <button
              type='button'
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className='h-5 w-5 text-gray-400' />
              ) : (
                <EyeIcon className='h-5 w-5 text-gray-400' />
              )}
            </button>
          </div>
        </FormInputLabel>

        <SubmitButton text='Login' />
      </form>
    </div>
  );
}
