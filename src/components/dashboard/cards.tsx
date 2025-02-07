import { getSalesCards } from "@/lib/data";
import PriceFormatter from "@/lib/utils";
import { DollarSign, Receipt, UsersRound } from "lucide-react";

export default async function DashboardCards() {
  const sales = await getSalesCards();

  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalUsers = Array.from(
    new Set(sales.flatMap((sale) => sale.user_id)),
  ).length;

  const cardItems = [
    {
      title: "Faturamento total:",
      value: PriceFormatter(totalSales),
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Total de Vendas:",
      value: sales.length,
      icon: <Receipt className="w-5 h-5" />,
    },
    {
      title: "Clientes:",
      value: totalUsers,
      icon: <UsersRound className="w-5 h-5" />,
    },
  ];

  return (
    <ul className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cardItems.map((item, index) => (
        <li key={index}>
          <div className="aspect-video rounded-xl bg-muted/50 grid justify-items-center p-8">
            <div className="flex items-center gap-1 justify-self-start h-fit whitespace-nowrap">
              {item.icon}
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>
            <span className="text-4xl font-extrabold">{item.value}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
