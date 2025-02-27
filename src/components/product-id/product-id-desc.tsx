"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { handleSetItem } from "@/lib/local-storage";
import { Select, SelectContent, SelectTrigger, SelectItem } from "../ui/select";
import { CartItemType, ProductDescType } from "@/types";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export default function ProductIdDesc({
  product,
}: {
  product: ProductDescType;
}) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | undefined>();
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const stock =
    selectedSize === undefined
      ? 0
      : product.variants[selectedVariant].sizes[selectedSize].stock;

  useEffect(() => {
    const currentVariantSizes = product.variants[selectedVariant].sizes;

    if (
      selectedSize === undefined ||
      currentVariantSizes[selectedSize]?.stock <= 0
    ) {
      const sizeIndex = currentVariantSizes.findIndex((size) => size.stock > 0);
      if (sizeIndex !== -1) {
        setSelectedSize(sizeIndex);
      } else {
        setSelectedSize(undefined);
      }
    }
  }, [selectedVariant, product, selectedSize]);

  const handleAddToCart = async () => {
    setLoading(true);

    if (selectedSize === undefined) {
      toast.warning("Estoque insuficiente.");
      return setLoading(false);
    }

    const cartItem: CartItemType = {
      productId: product.id,
      productName: product.name,
      variantId: product.variants[selectedVariant].id,
      variantColor: product.variants[selectedVariant].color,
      variantImage: product.variants[selectedVariant].image,
      sizeId: product.variants[selectedVariant].sizes[selectedSize].id,
      sizeName: product.variants[selectedVariant].sizes[selectedSize].name,
      quantity: quantity,
      price: product.price,
    };

    const response = await handleSetItem(cartItem);

    if (response?.error) {
      toast.error(response.error);
      return setLoading(false);
    }

    toast.success("Produto adicionado ao carrinho");
    setLoading(false);
  };

  return (
    <div className="max-md:mt-4 flex gap-4 flex-col">
      <div className="border-b pb-4">
        <h2 className="max-lg:text-3xl text-5xl font-bold">{product.name}</h2>
        <span className="max-lg:text-2xl text-3xl font-bold text-muted-foreground">
          R$ {product.price}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">Cor</h3>
        <ul className="flex gap-2 overflow-x-auto">
          {product.variants.map((variant: { color: string }, i: number) => (
            <li key={i}>
              <Button
                variant={"outline"}
                className={selectedVariant === i ? "border-blue-500" : ""}
                onClick={() => setSelectedVariant(i)}
              >
                {variant.color}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Tamanho</h3>
        <ul className="flex gap-2 flex-wrap">
          {product.variants[selectedVariant].sizes
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
            {`${
              selectedSize !== undefined
                ? `Quantidade: ${quantity} | (${stock})Disponíveis`
                : "Estoque indisponível."
            }`}
          </SelectTrigger>
          {selectedSize !== undefined && (
            <SelectContent>
              <ul className="flex flex-col gap-2 p-2">
                {Array.from({ length: stock }, (_, i) => i + 1).map((i) => (
                  <SelectItem key={i} value={`${i}`}>
                    {i} unidades
                  </SelectItem>
                ))}
              </ul>
            </SelectContent>
          )}
        </Select>
      </div>
      <p className="text-muted-foreground">{product.description}</p>
      <Button
        className="w-full h-14 mt-2 rounded-full text-lg md:text-base lg:text-lg relative"
        onClick={() => handleAddToCart()}
        disabled={stock <= 0 || selectedSize === undefined || loading}
      >
        <Plus className="absolute max-sm:left-3 left-5 md:left-3 lg:left-5" />
        {loading ? "Adicionando..." : "Adicionar ao carrinho"}
      </Button>
      <Toaster className="z-40" />
    </div>
  );
}
