"use client";

import { ChartNoAxesColumn } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getSalesDate } from "@/lib/data";

const chartConfig = {
  activities: {
    label: "Activities",
  },
  total: {
    label: "R$",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Linear() {
  const [sales, setSales] = useState<{ total: number; createdAt: Date }[]>([]);

  useEffect(() => {
    getSalesDate().then((sale) => {
      setSales(sale);
    });
  }, []);

  const chartData = Array.from({ length: 7 }, (_, index) => ({
    month: new Date(0, index + 1).toLocaleString("pt-BR", { month: "long" }),
    total: 0,
    sales: 0,
  }));

  sales.forEach((sale) => {
    const month = sale.createdAt.getMonth() - 1;
    chartData[month].total += sale.total;
    chartData[month].sales += 1;
  });

  const bestMonth = chartData.reduce((prev, current) => {
    return prev.total > current.total ? prev : current;
  });

  return (
    <Card className="lg:w-1/2 max-lg:w-full bg-muted/50 border-none p-8 flex flex-col gap-4 rounded-xl">
      <CardHeader className="p-0">
        <CardTitle className="flex w-full justify-between gap-1 text-2xl font-semibold items-center">
          Vendas Mensais
          <ChartNoAxesColumn className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full overflow-hidden"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8}>
              <LabelList
                dataKey="sales"
                position="middle"
                className="fill-foreground font-semibold text-base"
              />
            </Bar>
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
              defaultIndex={chartData.findIndex(
                (item) => item.month === bestMonth.month
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
