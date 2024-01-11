"use client";

import { Image, Input, Link } from "@nextui-org/react";
import LoginImg from "/public/login-img.svg";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SubmitButton from "@/components/Button/SubmitButton";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { loginCustomer } from "../actions/login-actions";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (formData: FormData) => {
    if (!formData.get("email")) {
      toast.error("Please fill in your email");
      return;
    }

    if (!formData.get("password")) {
      toast.error("Please fill in your password");
      return;
    }

    const res = await loginCustomer(formData);
    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 max-sm:gap-8 items-center mt-12'>
      <div>
        <h1 className='text-4xl font-bold mb-2'>Login</h1>
        <p className='text-gray-500'>to enjoy more of our services</p>
        <Image
          src={LoginImg.src}
          className='mt-12'
          width='300'
          height='300'
          alt='login-img'
        />
      </div>
      <form className='flex flex-col gap-5' action={handleLogin}>
        <Input
          variant='bordered'
          type='email'
          label='Email'
          placeholder='Enter your email'
          name='email'
        />
        <Input
          label='Password'
          variant='bordered'
          placeholder='Enter your password'
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

        <SubmitButton label='Login' />

        <p className='text-sm'>
          Don&apos;t have an account? <Link href='/signup'>Signup</Link>
        </p>
      </form>
    </div>
  );
}
