"use client";

import Loader from "@/components/Loading/Loader";

export default function Loading() {
  return (
    <div className='h-[100vh] w-full grid place-content-center'>
      <Loader />
    </div>
  );
}
