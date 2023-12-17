"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

function DetailsButton({ details }: { details: string }) {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/${details}`}>
      <Button
        size={"sm"}
        className='hover:ring bg-transparent'
        variant={"outline"}
      >
        <Pencil size={"16"} className='mr-2' />
        Details
      </Button>
    </Link>
  );
}

export default DetailsButton;
