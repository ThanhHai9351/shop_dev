import { Bar, ResponsiveContainer } from "recharts";
import { BarChart as BarGraph, XAxis, YAxis } from "recharts";

type Props = { monthlyRevenue: Record<string, number> };

export default function BarChart({ monthlyRevenue }: Props) {
  // Generate data from monthlyRevenue
  const data = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ].map((month, index) => {
    const monthKey = `${(index + 1).toString().padStart(2, "0")}-2024`;
    return {
      name: month,
      total: monthlyRevenue[monthKey] || 0,
    };
  });

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} fill="#82ca9d" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
