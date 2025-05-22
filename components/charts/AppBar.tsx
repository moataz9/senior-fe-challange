"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function AppBar({
  title,
  tooltipDesc,
  chartData,
}: {
  title: string;
  tooltipDesc: string;
  chartData: { name: string; value: number }[];
}) {
  return (
    <div className="p-8 flex flex-col items-center min-w-[1000px]">
      <h2 className="text-2xl text-center font-bold mb-4 text-teal-600">
        {title}
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} className="[&>svg>path]:fill-teal-400">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-teal-200)" />
          <XAxis dataKey="name" stroke="var(--color-teal-400)" />
          <YAxis dataKey="value" stroke="var(--color-teal-400)" />
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
          <Legend />
          <Bar
            dataKey="value"
            name="Unique Languages"
            fill="var(--color-teal-600)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
