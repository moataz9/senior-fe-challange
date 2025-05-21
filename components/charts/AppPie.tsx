"use client";

import { useQuery } from "@apollo/client";
import { GET_COUNTRIES, type Country } from "@/graphql/queries/getCountries";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TEAL_COLORS = [
  "#008080",
  "#009688",
  "#00796B",
  "#1DE9B6",
  "#00BFA5",
  "#4DB6AC",
  "#26A69A",
  "#00695C",
  "#00ACC1",
  "#80CBC4",
  "#B2DFDB",
  "#64FFDA",
  "#18FFFF",
  "#004D40",
  "#A7FFEB",
];

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
