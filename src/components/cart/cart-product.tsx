'use client'

import { Minus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
import { handle1Item, handleRemoveItem } from "@/lib/local-storage";
import { useState } from "react";
import { CartItemType } from "@/types";
import PriceFormatter from "@/lib/utils";

export default function CartProduct({ checkout, product }: { checkout?: boolean, product: CartItemType }) {
  const [disabled, setDisabled] = useState(false);

  const handleAddItem = async () => {
    const add = await handle1Item(product, "add");
    if(add?.error) setDisabled(true);
  };

  const handleRemoveOneItem = () => {
    handle1Item(product, "remove");
    if(disabled) setDisabled(false);
  };

  return (
    <div className="flex gap-2 justify-between border-b pb-4 px-1">
      <div className="flex gap-2 w-full relative">
        <Card className="aspect-square max-md:max-w-[75px] max-w-[65px] w-full">
          <Image
            src={product?.variantImage ?? ""}
            alt=""
            width={80}
            height={80}
            className="h-full w-full object-contain"
            loading="eager"
            priority
          />
        </Card>
        <Button
          variant="outline"
          className="h-6 w-6 p-2 absolute -top-1 -left-1 font-bold"
          onClick={() => handleRemoveItem(product)}
        >
          {checkout ? product?.quantity : <X className="text-muted-foreground"/>}
        </Button>
        <div className="grid content-start">
          <h2 className="font-bold truncate">{product?.productName}</h2>
          <h3 className="text-sm text-muted-foreground truncate">{product?.variantColor} / {product?.sizeName}</h3>
        </div>
      </div>
      <div className="flex flex-col items-end w-1/2 whitespace-nowrap">
        <h4 className="font-bold">{PriceFormatter(product?.price)}</h4>
        <div
          data-checkout={checkout}
          className="flex items-center gap-2 data-[checkout=true]:hidden"
        >
          <Button
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleRemoveOneItem()}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-bold">{product?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleAddItem()}
            disabled={disabled}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}