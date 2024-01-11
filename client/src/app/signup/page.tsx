"use client";

import { Image, Input, Link } from "@nextui-org/react";
import SignUpImg from "/public/signup-img.svg";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SubmitButton from "@/components/Button/SubmitButton";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { createCustomer } from "../actions/signup-actions";

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignup = async (formData: FormData) => {
    if (!formData.get("name")) {
      toast.error("Please fill in user name");
      return;
    }

    if (!formData.get("email")) {
      toast.error("Please fill in your email");
      return;
    }

    if (!formData.get("password")) {
      toast.error("Please fill in your password");
      return;
    }

    const res = await createCustomer(formData);
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
        <h1 className='text-4xl font-bold mb-2'>Sign Up</h1>
        <p className='text-gray-500'>Create your account</p>
        <Image
          src={SignUpImg.src}
          className='mt-12'
          width='300'
          height='300'
          alt='signup-img'
        />
      </div>
      <form className='flex flex-col gap-5' action={handleSignup}>
        <Input
          variant='bordered'
          type='text'
          label='User name'
          placeholder='Enter your user name'
          name='name'
        />
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

        <SubmitButton label='Create account' />

        <p className='text-sm'>
          Already have an account? <Link href='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
}
