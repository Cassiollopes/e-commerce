import { ShoppingBag } from "lucide-react";
import { getLastSales } from "@/lib/data";
import SalesAvatar from "../sales-avatar";
import PriceFormatter from "@/lib/utils";

export default async function LastSales() {
  const sales = await getLastSales();

  return (
    <div className="aspect-video rounded-xl bg-muted/50 flex flex-col p-8 gap-4 max-md:w-full lg:w-1/2">
      <div className="flex items-center w-full justify-between gap-1 justify-self-start h-fit">
        <h2 className="text-2xl font-semibold">Ultimas Vendas</h2>
        <ShoppingBag className="h-5 w-5" />
      </div>
      <ul className="flex flex-col w-full">
        {sales.map((sale) => (
          <li
            key={sale.id}
            className="flex items-start justify-between gap-2 w-full border-b py-3"
          >
            <SalesAvatar sale={{ user: sale.User, userId: sale.userId }} />
            <span className="font-bold whitespace-nowrap">
              + {PriceFormatter(sale.total)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
