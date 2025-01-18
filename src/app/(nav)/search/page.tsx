import CategoryFilter from "@/components/search/category-filter";
import PriceFilter from "@/components/search/price-filter";
import ProductsList from "@/components/search/products-list";
import { ProductsListSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search"
};

export default async function Search(props: {
  searchParams?: Promise<{
    query?: string;
    category?: string;
    price?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  const price = searchParams?.price || '';

  return (
    <div
      className="grid grid-cols-10 lg:grid-cols-8 items-start justify-items-start md:min-h-screen 
      px-4 max-md:gap-2 gap-8 max-md:grid-cols-1"
    >
      <CategoryFilter className="col-span-1 md:col-span-2 lg:col-span-1" />
      <Suspense fallback={<ProductsListSkeleton className="max-md:order-3 md:col-span-6" />}>
        <ProductsList query={query} category={category} price={price} className="max-md:order-3 md:col-span-6" />
      </Suspense>
      <PriceFilter className="col-span-1 md:col-span-2 lg:col-span-1 max-md:pb-2" />
    </div>
  )
}