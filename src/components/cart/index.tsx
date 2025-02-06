import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CircleCheckBig, ShoppingBag, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import CartProduct from "./cart-product"
import { useEffect, useState } from "react"
import { CartItemType } from "@/types"
import PriceFormatter from "@/lib/utils"

export default function Cart() {
  const [products, setProducts] = useState<CartItemType[]>([])
  const router = useRouter()

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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="h-11 w-11 relative">
          {products.length > 0 && 
            <span
              className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center bg-primary text-background 
              text-xs font-bold rounded-full"
            >
              {products.reduce((total: number, product) => total + product.quantity, 0)}
            </span>
          }
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-md:w-full">
        <SheetHeader className="text-start">
          <SheetTitle className="text-2xl font-extrabold">Carrinho</SheetTitle>
        </SheetHeader>
        {products.length > 0 ? (
          <div className="flex flex-col gap-6 h-full py-10 justify-between">
            <ul className="overflow-y-auto flex flex-col gap-4 py-1 w-full">
              {products.map((product, i) => (
                <li key={i}>
                  <CartProduct product={product} />
                </li>
              ))}
            </ul>
            <div>
              <div className="flex justify-between border-b pb-2">
                <h2 className="">Total</h2>
                <h3 className="text-xl font-bold">
                  {PriceFormatter(products.reduce((total: number, product) => total + (product.price * product.quantity), 0))}
                </h3>
              </div>
              <SheetFooter className="pt-6">
                <SheetClose asChild>
                  <Button onClick={() => router.push("/checkout")} type="submit"
                    className="w-full rounded-full h-14 text-lg gap-1"
                  >
                    Finalizar compra
                    <CircleCheckBig className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </div>
        ) : (
            <div className="flex flex-col items-center justify-center gap-1 h-full text-muted-foreground ">
            <ShoppingBag className="h-16 w-16 stroke-1 opacity-70" />
            <p className="font-bold text-base">seu carrinho esta vazio</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
