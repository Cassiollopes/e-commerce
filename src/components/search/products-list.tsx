import { getProductsFiltered } from "@/lib/data";
import ProductCard from "../product-card";
import { PackageSearch } from "lucide-react";

export default async function ProductsList({ query, category, price, ...props }: {
  query?: string,
  category?: string,
  price?: string
} & React.HTMLAttributes<HTMLDivElement>) {

  const products = await getProductsFiltered(query, category, price);

  return (
    <div className={`${props.className} w-full`}>
      {products.length === 0 &&
        <span className="text-muted-foreground font-semibold py-4 w-full flex justify-center items-center gap-1 flex-wrap text-sm">
          <PackageSearch />
          Nenhum resultado para {`"${query}"`} {category && `em "${category}"`}
        </span>
      }
      <ul className="gap-4 h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <li key={i} className="aspect-square w-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}