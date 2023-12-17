import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg mb-32'>
        <h3 className='text-black text-center'>
          Oops, looks like you are lost!
        </h3>
        <Link href='/'>
          <button className='bg-accent text-white hover:ring px-4 py-2 mt-4 rounded-lg w-full'>
            Go back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
