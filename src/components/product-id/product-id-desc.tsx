'use client'

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { handleSetItem } from "@/lib/local-storage";
import { Select, SelectContent, SelectTrigger, SelectItem } from "../ui/select";
import { CartItemType, ProductDescType } from "@/types";
import { toast } from "sonner"
import { Toaster } from "../ui/sonner";

export default function ProductIdDesc({ product }: { product: ProductDescType }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | undefined>();
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const stock = selectedSize === undefined ? 0 : product.Variant[selectedVariant].Size[selectedSize].stock

  useEffect(() => {
    if (selectedSize !== undefined && stock === 0) {
      setSelectedSize(undefined);
    }
  }, [selectedVariant])

  useEffect(() => {
    if (selectedSize === undefined) {
      setQuantity(1);
    } else if (stock < quantity && stock > 0) {
      setQuantity(product.Variant[selectedVariant].Size[selectedSize].stock);
    }
  }, [selectedSize, selectedVariant])

  useEffect(() => {
    if (selectedSize === undefined || stock <= 0) {
      const sizeIndex = product.Variant[selectedVariant].Size.findIndex(size => size.stock > 0);
      if (sizeIndex !== -1) {
        setSelectedSize(sizeIndex);
      } else {
        setSelectedSize(undefined);
      }
    }
  }, [selectedVariant, product]);

  const handleAddToCart = async () => {
    setLoading(true);

    if (selectedSize === undefined) {
      toast.warning("Estoque insuficiente.");
      return setLoading(false);
    }

    const cartItem: CartItemType = {
      productId: product.id,
      productName: product.name,
      variantId: product.Variant[selectedVariant].id,
      variantColor: product.Variant[selectedVariant].color,
      variantImage: product.Variant[selectedVariant].image,
      sizeId: product.Variant[selectedVariant].Size[selectedSize].id,
      sizeName: product.Variant[selectedVariant].Size[selectedSize].name,
      quantity: quantity,
      price: product.price
    }

    const response = await handleSetItem(cartItem)

    if (response?.error) {
      toast.error(response.error);
      return setLoading(false);
    }

    toast.success("Produto adicionado ao carrinho");
    setLoading(false);
  }

  return (
    <div className="max-md:mt-4 flex gap-4 flex-col">
      <div className="border-b pb-4">
        <h2 className="max-lg:text-3xl text-5xl font-bold">{product.name}</h2>
        <span className="max-lg:text-2xl text-3xl font-bold text-muted-foreground">R$ {product.price}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">Cor</h3>
        <ul className="flex gap-2 overflow-x-auto">
          {product.Variant.map((variant: { color: string }, i: number) => (
            <li key={i}>
              <Button
                variant={"outline"}
                className={selectedVariant === i ? "border-blue-500" : ""}
                onClick={() => setSelectedVariant(i)}>
                {variant.color}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Tamanho</h3>
        <ul className="flex gap-2 flex-wrap">
          {product.Variant[selectedVariant].Size
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((size, i) => (
              <li key={i}>
                <Button
                  variant={"outline"}
                  className={`${selectedSize === i ? "border-blue-500" : ""} relative`}
                  onClick={() => setSelectedSize(i)}
                  disabled={size.stock <= 0}
                >
                  {size.name}
                </Button>
              </li>
            ))}
        </ul>
        <Select onValueChange={(e) => setQuantity(parseInt(e))}>
          <SelectTrigger className="w-full">
            {`${selectedSize !== undefined
              ? `Quantidade: ${quantity} | (${stock})Disponíveis`
              : "Nenhum tamanho disponível"
              }`}
          </SelectTrigger>
          {selectedSize !== undefined &&
            <SelectContent>
              <ul className="flex flex-col gap-2 p-2">
                {
                  Array.from({ length: stock }, (_, i) => i + 1).map((i) => (
                    <SelectItem
                      key={i}
                      value={`${i}`}
                    >
                      {i} unidades
                    </SelectItem>
                  ))
                }
              </ul>
            </SelectContent>
          }
        </Select>
      </div>
      <p className="text-muted-foreground">{product.description}</p>
      <Button
        className="w-full h-14 mt-2 rounded-full text-lg md:text-base lg:text-lg relative"
        onClick={() => handleAddToCart()}
      >
        <Plus className="absolute max-sm:left-3 left-5 md:left-3 lg:left-5" />
        {loading ? "Adicionando..." : "Adicionar ao carrinho"}
      </Button>
      <Toaster className="z-40" />
    </div>
  );
}