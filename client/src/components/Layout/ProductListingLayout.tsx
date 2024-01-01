import React from "react";

export default function ProductListingLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-6 mb-6'>
      {children}
    </div>
  );
}
