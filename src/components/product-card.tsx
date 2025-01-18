import { Card } from "./ui/card";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCardType } from "../types";
import PriceFormatter from "@/lib/price-formatter";

export default function ProductCard({ product, ...props }: {
  product?: ProductCardType
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Link href={`/product/${product?.id}`} className={props.className}>
      <Card className="w-full h-full flex justify-center items-center hover:cursor-pointer 
      hover:border-blue-500 group overflow-hidden relative"
      >
        <div className={`grid grid-cols-[auto,1fr] mr-1 pl-3 pr-1 py-1 items-center border gap-2 
          bg-background absolute rounded-full z-10 drop-shadow-2xl left-4 bottom-10 font-bold`}
        >
          <span className="truncate">{product?.name}</span>
          <span className="bg-foreground text-background px-2 py-1 rounded-full text-right">
            {PriceFormatter(product?.price ?? 0)}
          </span>
        </div>
        <Image
          src={product?.image ?? ""}
          alt={product?.name ?? ""}
          className="h-full w-fit object-contain group-hover:scale-105 ease-linear duration-150"
          width={500}
          height={500}
          loading="eager"
        />
      </Card>
    </Link>
  )
}