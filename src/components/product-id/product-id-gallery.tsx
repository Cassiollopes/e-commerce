"use client";

import { Card } from "../ui/card";
import Image from "next/image";
import { useState } from "react";

export default function ProductIdGallery({
  images,
  ...props
}: {
  images: { image: string }[];
} & React.HTMLAttributes<HTMLDivElement>) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div
      className={`grid h-full justify-items-center gap-8 ${props.className}`}
    >
      <Card className="w-full max-w-[400px] aspect-square">
        <Image
          src={images[selectedImage].image ?? ""}
          alt=""
          width={500}
          height={500}
          className="h-full w-full object-contain"
          loading="eager"
          priority
        />
      </Card>
      <ul className="flex gap-2 h-full w-full justify-center items-center">
        {images.map((image, index) => (
          <li key={index} onClick={() => setSelectedImage(index)}>
            <Card
              className={`aspect-square w-full max-w-[80px] hover:cursor-pointer hover:border-blue-500 
              ${index === selectedImage ? "border-blue-500" : ""}`}
            >
              <Image
                src={image.image ?? ""}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-contain"
                loading="eager"
                priority
              />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
