"use client";

import { TypeAnimation } from "react-type-animation";

export default function ClientTextAnimation() {
  return (
    <div>
      <TypeAnimation
        sequence={[
          "Explore our latest offers",
          1000,
          "Explore our latest deals",
          1000,
          "Explore our latest sales",
          1000,
        ]}
        wrapper='span'
        cursor={true}
        repeat={Infinity}
        className='text-7xl font-bold'
      />
    </div>
  );
}
