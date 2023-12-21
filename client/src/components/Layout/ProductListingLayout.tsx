import React from "react";

export default function ProductListingLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className='grid grid-cols-4 justify-items-center gap-6 mb-6'>
      {children}
    </div>
  );
}
