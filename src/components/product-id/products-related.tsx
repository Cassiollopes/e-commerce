import { getRelatedProducts } from "@/lib/data";
import ProductCard from "../product-card";

export default async function ProductsRelated({ id }: { id: string }) {
  const products = await getRelatedProducts(id);

  return (
    <div className="w-full flex justify-start overflow-x-auto">
      <ul className="flex gap-4">
        {products.map((product, i) => (
          <li key={i} className="relative aspect-square h-[30vh] md:h-[50vh]">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
