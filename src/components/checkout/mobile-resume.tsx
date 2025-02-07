"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartProduct from "../cart/cart-product";
import { CartItemType } from "@/types";

export default function MobileResume({
  products,
  deliveryPrice,
  productsPrice,
  total,
}: {
  products: CartItemType[];
  deliveryPrice: string;
  total: string;
  productsPrice: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="md:hidden border p-2 rounded-lg overflow-hidden">
      <Button
        variant="outline"
        className="w-full drop-shadow-sm justify-between text-base font-bold"
        onClick={() => (show ? setShow(false) : setShow(true))}
      >
        <div className="flex items-center gap-1">
          {show ? <span>Ver Menos</span> : <span>Ver Mais</span>}
          {show ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        <span>{total}</span>
      </Button>
      <AnimatePresence>
        {show && products.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto" }}
            whileInView={{ opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            <ul className="overflow-y-auto flex flex-col gap-4 px-1 pt-4 max-h-[40vh]">
              {products.map((product, i) => (
                <li key={i}>
                  <CartProduct checkout={true} product={product} />
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 pb-2 px-1">
              <div className="flex justify-between font-bold">
                <h2>
                  Subtotal{" "}
                  <span className="text-muted-foreground text-xs">
                    {products.length}x produto(s)
                  </span>
                </h2>
                <h2>{productsPrice}</h2>
              </div>
              <div className="flex justify-between font-bold">
                <h2>Taxa de entrega</h2>
                <h2>{deliveryPrice}</h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
