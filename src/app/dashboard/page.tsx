import Linear from "@/components/dashboard/chart-linear";
import DashboardCards from "@/components/dashboard/cards";
import LastSales from "@/components/dashboard/last-sales";
import { Suspense } from "react";
import CardsSkeleton, { LastSalesSkeleton } from "@/components/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[100vw] overflow-hidden">
      <Suspense fallback={<CardsSkeleton />}>
        <DashboardCards />
      </Suspense>
      <div className="flex justify-between gap-4 max-lg:flex-col-reverse flex-1">
        <Suspense fallback={<LastSalesSkeleton />}>
          <LastSales />
        </Suspense>
        <Linear />
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'