import React from "react";

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <div className='flex justify-between mb-8'>
      <div className='px-4 py-2 rounded-md w-fit border-2 border-white'>
        <h1 className='text-sm text-white font-semibold'>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
