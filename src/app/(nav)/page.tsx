import ThreeProducts from "@/components/home/three-products";
import { Carousel } from "@/components/home/carousel";
import { Suspense } from "react";
import {
  CarouselSkeleton,
  ThreeProductsSkeleton,
} from "@/components/skeletons";

export default function Home() {
  return (
    <div className="grid items-start justify-items-center min-h-screen px-4 gap-4">
      <Suspense fallback={<ThreeProductsSkeleton />}>
        <ThreeProducts />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <Carousel />
      </Suspense>
    </div>
  );
}

export const dynamic = "force-dynamic";
