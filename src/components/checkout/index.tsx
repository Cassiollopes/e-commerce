'use client'

import { BadgeAlert } from "lucide-react";
import { Button } from "../ui/button";
import Resume from "./resume";
import MobileResume from "./mobile-resume";
import PaymentForm from "./payment-form";
import { useEffect, useState } from "react";
import { CartItemType } from "@/types";
import PriceFormatter from "@/lib/price-formatter";
import { Logo } from "../logo";

export default function Checkout() {
  const [products, setProducts] = useState<CartItemType[]>([])
  const [deliveryMethod, setDeliveryMethod] = useState<{ method: string, price: number }>({ method: '', price: 0 });

  const productsPrice = PriceFormatter(products.reduce((total: number, product) => total + (product.price * product.quantity), 0));
  const deliveryPrice = PriceFormatter(deliveryMethod.price);
  const total = PriceFormatter(products.reduce((total: number, product) => total + (product.price * product.quantity), 0) + deliveryMethod.price);

  useEffect(() => {
    const handleGetItem = () => {
      const storedProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
      setProducts(storedProducts);
    }
    handleGetItem();
  }, [])

  useEffect(() => {
    const handleGetItem = () => {
      const storedProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
      setProducts(storedProducts);
    }

    window.addEventListener("storage", handleGetItem)
  }, [products])

  return (
    <div className="flex md:gap-6 py-10 w-[60vw] max-md:flex-col max-xl:w-full max-xl:p-10 max-md:p-8">
      <div className="flex flex-col justify-start gap-6 md:w-1/2 relative">
        <Button variant={"outline"} className="absolute p-2 gap-1 top-0 right-0 rounded-t-none border-t-0 max-md:shadow-sm text-xs md:border-none">
          <BadgeAlert className="h-6 w-6" />
          Simulação
        </Button>
        <div className="flex items-start gap-1">
          <Logo className="h-14 w-14" />
          <div>
            <h1 className="text-2xl font-bold">Checkout</h1>
            <h3 className="text-xs text-muted-foreground">{products.length} produto(s)</h3>
          </div>
        </div>
        <MobileResume deliveryPrice={deliveryPrice} productsPrice={productsPrice} total={total} products={products} />
        <PaymentForm deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} products={products} />
      </div>
      <Resume productsPrice={productsPrice} deliveryPrice={deliveryPrice} total={total}  products={products} />
    </div>
  )
}