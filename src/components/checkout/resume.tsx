import { CartItemType } from "@/types";
import CartProduct from "../cart/cart-product";

export default function Resume({ products, deliveryPrice, productsPrice, total }: {
  products: CartItemType[], deliveryPrice: string, total: string, productsPrice: string
}) {

  return (
    <div className="flex flex-col border-l px-4 gap-2 w-1/2 max-md:hidden">
      <ul className="overflow-y-auto flex flex-col gap-4 pt-1 max-h-[45vh]">
        {products.map((product, i) => (
          <li key={i}>
            <CartProduct checkout={true} product={product} />
          </li>
        ))}
      </ul>
      <div className="flex flex-col border-b pb-2 px-1 pt-4">
        <div className="flex justify-between font-bold">
          <h2>Subtotal <span className="text-muted-foreground text-xs">{products.length}x produtos</span></h2>
          <h2>{productsPrice}</h2>
        </div>
        <div className="flex justify-between font-bold">
          <h2>Taxa de entrega</h2>
          <h2>{deliveryPrice}</h2>
        </div>
      </div>
      <div className="flex justify-between font-bold text-xl">
        <h2>Total</h2>
        <h2>{total}</h2>
      </div>
    </div>
  );
}