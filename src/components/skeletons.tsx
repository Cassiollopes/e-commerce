import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function ProductCardSkeleton({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`relative w-full h-full ${props.className}`}>
      <Skeleton className="w-full h-full rounded-xl" />
      <Skeleton className="absolute bottom-10 h-10 min-w-40 left-4 bg-background rounded-full z-10" />
    </div>
  );
}

export function ThreeProductsSkeleton() {
  return (
    <div className="grid grid-rows-4 grid-cols-3 gap-4 w-full md:h-[70vh] max-md:grid-cols-1 max-md:grid-rows-3">
      <ProductCardSkeleton className="row-span-4 col-span-2 max-md:col-span-1 max-md:aspect-square" />
      <ProductCardSkeleton className="col-span-1 row-span-2 max-md:aspect-square" />
      <ProductCardSkeleton className="col-span-1 row-span-2 max-md:aspect-square" />
    </div>
  )
}

export function CarouselSkeleton() {
  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {[...Array(9)].map((_, i) => (
          <li
            key={`${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductsListSkeleton({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${props.className} w-full`}>
      <ul className="gap-4 h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <li key={i} className="aspect-square w-full">
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductIdGallerySkeleton({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`grid h-full justify-items-center gap-8 ${props.className}`}>
      <Card className="w-full max-w-[400px] aspect-square">
        <Skeleton className="h-full w-full" />
      </Card>
      <ul className="flex gap-2 h-full w-full justify-center items-center">
        <Card className={`aspect-square w-full max-w-[80px] hover:cursor-pointer hover:border-blue-500 `}>
          <Skeleton className="h-full w-full" />
        </Card>
      </ul>
    </div>
  );
}

export function ProductIdDescSkeleton() {
  return (
    <div className="max-md:mt-4 flex gap-4 flex-col overflow-hidden">
      <div className="border-b pb-4">
        <Skeleton className="max-lg:w-3/4 w-1/2 h-11 max-md:h-8" />
        <Skeleton className="max-lg:w-1/2 w-1/4 h-8 mt-2 max-md:h-7" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-14 h-8" />
        <ul className="flex gap-2 flex-nowrap">
          {[...Array(3)].map((_, i) => (
            <li key={i}>
              <Skeleton className="w-20 h-10" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-28 h-8" />
        <ul className="flex gap-2 flex-nowrap">
          {[...Array(4)].map((_, i) => (
            <li key={i}>
              <Skeleton className="w-16 h-10" />
            </li>
          ))}
        </ul>
        <Skeleton className="w-full h-10 rounded-none" />
      </div>
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-14 mt-2 rounded-full" />
    </div>
  )
}

export function ProductIdSkeleton() {
  return (
    <Card className="grid grid-cols-3 gap-4 w-full max-md:grid-cols-1 p-12 max-lg:p-8">
      <ProductIdGallerySkeleton className="md:col-span-2" />
      <ProductIdDescSkeleton />
    </Card>
  );
}

export function ProductsRelatedSkeleton() {
  return (
    <div className="w-full flex justify-start overflow-x-auto">
      <ul className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <li key={i} className="relative aspect-square h-[30vh] md:h-[50vh]">
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CardsSkeleton() {
  return (
    <ul className="grid auto-rows-min gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <li key={index}>
          <div className="aspect-video rounded-xl bg-muted/50 grid justify-items-center p-8">
            <div className="flex items-center gap-1 justify-self-start h-fit">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="w-1/2 h-6" />
            </div>
            <Skeleton className="w-1/3 h-10" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function SalesAvatarSkeleton() {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      <div className="aspect-square w-[40px] animate-pulse bg-muted/50 rounded-full" />
      <div>
        <div className="h-5 w-20 bg-muted/50 rounded-full" />
        <div className="h-4 w-10 bg-muted/50 rounded-full mt-1" />
      </div>
    </div>
  )
}

export function LastSalesSkeleton() {
  return (
    <div className="aspect-video rounded-xl bg-muted/50 flex flex-col p-8 gap-4 max-md:w-full w-1/2">
      <div className="flex w-full justify-between items-center gap-1 justify-self-start h-fit">
        <h2 className="text-2xl font-semibold">Ultimas Vendas</h2>
        <Skeleton className="h-5 w-5" />
      </div>
      <ul className="flex flex-col w-full">
        {[...Array(5)].map((_, i) => (
          <li key={i} className="flex items-start justify-between gap-2 w-full border-b py-3">
            <SalesAvatarSkeleton />
            <Skeleton className="w-1/3 h-6" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SalesTableSkeleton() {
  return (
    <Card className="overflow-hidden bg-muted/50 border-none p-4 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow className="md:hidden">
            <TableHead className="w-[100px]">
              <Skeleton className="h-6 w-full" />
            </TableHead>
          </TableRow>
          <TableRow className="max-md:hidden">
            <TableHead className="w-[100px]">
              <Skeleton className="h-6 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-full" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="h-6 w-full" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="md:hidden">
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-2/4">
                <SalesAvatarSkeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody className="max-md:hidden">
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-2/4">
                <SalesAvatarSkeleton />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-6 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
