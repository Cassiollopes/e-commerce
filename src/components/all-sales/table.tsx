import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSalesPaginated } from "@/lib/data";
import { Card } from "../ui/card";
import SalesAvatar from "../sales-avatar";
import PriceFormatter from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export default async function SalesTable({
  page,
  query,
}: {
  page?: string;
  query?: string;
}) {
  const sales = await getSalesPaginated(Number(page) || 1, query);

  return (
    <Card className="overflow-hidden bg-muted/50 border-none p-4 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cliente</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Entrega</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell className="w-2/4 min-w-[250px]">
                <SalesAvatar sale={{ user: sale.User, userId: sale.userId }} />
              </TableCell>
              <TableCell>{sale.payment_method}</TableCell>
              <TableCell>{sale.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{sale.delivery_method}</TableCell>
              <TableCell className="text-right">
                {PriceFormatter(sale.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sales.length === 0 && (
        <span className="gap-1 py-4 text-sm  flex items-center justify-center">
          <AlertCircle className="h-4 w-4" />
          Nenhuma resultado para {`"${query}"`} em vendas.
        </span>
      )}
    </Card>
  );
}
