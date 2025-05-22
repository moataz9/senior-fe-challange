"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { TEAL_COLORS } from "@/contants/colors";

export default function AppPie({
  title,
  tooltipDesc,
  chartData,
}: {
  title: string;
  tooltipDesc: string;
  chartData: { name: string; value: number }[];
}) {
  return (
    <div className="p-8 flex flex-col items-center min-w-[680px]">
      <h1 className="text-2xl font-bold mb-4 text-center text-teal-600">
        {title}
      </h1>
      <ResponsiveContainer height={400} width="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            label={({ name }) => `${name}`}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={TEAL_COLORS[index % TEAL_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-teal-50 p-2 border rounded shadow">
                    <p>{`${payload[0].name}: ${payload[0].value} ${tooltipDesc}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
