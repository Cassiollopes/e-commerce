import { getProductsCard } from "@/lib/data";
import ProductCard from "../product-card";

export default async function ThreeProducts() {
  const products = await getProductsCard();

  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-4 w-full md:h-[70vh] max-md:grid-cols-1 max-md:grid-rows-3">
      <ProductCard product={products[0]} className="row-span-4 col-span-2 max-md:col-span-1 max-md:aspect-square" />
      <ProductCard product={products[1]} className="col-span-1 row-span-2 max-md:aspect-square" />
      <ProductCard product={products[2]} className="col-span-1 row-span-2 max-md:aspect-square" />
    </div>
  )
}