"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Image } from "@nextui-org/react";
import { ProductImage } from "@prisma/client";

export default function ClientImageCarousel({
  imageList,
  primaryImg,
}: {
  imageList: ProductImage[];
  primaryImg: string;
}) {
  const imageListWithPrimary = [
    {
      ProductId: Math.random().toString(),
      ProductImagesId: Math.random().toString(),
      ProductImage: primaryImg,
    },
  ].concat(imageList);

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows
      useKeyboardArrows
      stopOnHover
      swipeable
      showThumbs={false}
    >
      {imageListWithPrimary.map((image) => (
        <div key={image.ProductImagesId}>
          <Image
            alt='image'
            src={image.ProductImage}
            width={500}
            height={500}
            className='w-[500px] h-[500px] object-cover'
          />
        </div>
      ))}
    </Carousel>
  );
}
