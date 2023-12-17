"use client";

import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className='h-[100vh] w-full grid place-content-center'>
      <HashLoader color='white' />
    </div>
  );
}
