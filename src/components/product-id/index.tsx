import { getProductDesc, getProductVariantImages } from "@/lib/data";
import { Card } from "../ui/card";
import ProductIdDesc from "./product-id-desc";
import ProductIdGallery from "./product-id-gallery";

export default async function ProductId({ id }: { id: string }) {

  const [images, desc] = await Promise.all([
    await getProductVariantImages(id),
    await getProductDesc(id),
  ])

  return (
    <Card className="grid grid-cols-3 gap-4 w-full max-md:grid-cols-1 p-12 max-lg:p-8">
      <ProductIdGallery images={images ?? []} className="md:col-span-2" />
      <ProductIdDesc product={desc} />
    </Card>
  );
}