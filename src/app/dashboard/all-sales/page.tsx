import Navigation from "@/components/all-sales/navigation";
import SalesSearch from "@/components/all-sales/sales-search";
import SalesTable from "@/components/all-sales/table";
import { SalesTableSkeleton } from "@/components/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Sales",
};

export default async function AllSales(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page;
  const query = searchParams?.query;

  return (
    <div className="flex flex-col gap-4 px-4 h-full max-w-[100vw]">
      <div className="md:w-1/2">
        <SalesSearch />
      </div>
      <Suspense fallback={<SalesTableSkeleton />}>
        <SalesTable query={query} page={page} />
      </Suspense>
      <div>
        <Navigation query={query} page={page} />
      </div>
    </div>
  );
}
