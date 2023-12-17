"use client";

import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CreateButton = () => {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/create`}>
      <Button className='bg-white hover:bg-white hover:ring'>
        <Plus className='mr-2 h-4 w-4' color='black' />
        <span className='pb-[1px] text-black'>Create</span>
      </Button>
    </Link>
  );
};

export default CreateButton;
