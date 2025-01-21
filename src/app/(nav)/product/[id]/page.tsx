import ProductId from "@/components/product-id";

import ProductsRelated from "@/components/product-id/products-related";
import { ProductIdSkeleton, ProductsRelatedSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Product",
};

export default async function Product(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="grid items-center justify-items-center px-4 gap-4">
      <Suspense fallback={<ProductIdSkeleton />}>
        <ProductId id={id} />
      </Suspense>
      <h2 className="mr-auto max-md:text-2xl text-3xl font-bold mt-4">Produtos Relacionados</h2>
      <Suspense fallback={<ProductsRelatedSkeleton />}>
        <ProductsRelated id={id} />
      </Suspense>
    </div>
  )
}