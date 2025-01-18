import { getProductsCard } from '@/lib/data';
import ProductCard from '../product-card';

export async function Carousel() {
  const products = await getProductsCard();
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}