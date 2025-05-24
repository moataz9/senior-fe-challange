"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { TEAL_COLORS } from "@/constants/colors";
import { toolTipTheme } from "@/constants/tailwindCss";
import { useState } from "react";

export default function AppPie({
  title,
  tooltipDesc,
  chartData,
}: {
  title: string;
  tooltipDesc: string;
  chartData: { name: string; value: number }[];
}) {
  // State for filter, sort, and pagination
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => chartData.length || 3);

  // Dynamically generate per-page options: "All", then 5, 10, 15, ... up to chartData.length
  const perPageOptions = [
    { label: "All", value: chartData.length },
    ...Array.from(
      { length: Math.ceil(chartData.length / 5) },
      (_, i) => (i + 1) * 5
    )
      .filter((v) => v < chartData.length)
      .map((v) => ({ label: v.toString(), value: v })),
  ];
  // Filter
  let filtered = chartData.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  // Sort
  filtered = filtered.sort((a, b) =>
    sortAsc ? a.value - b.value : b.value - a.value
  );
  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedChartData = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-8 flex flex-col items-center min-w-[1000px]">
      <h2 className="text-2xl text-center font-bold mb-4 text-teal-600">
        {title}
      </h2>
      {/* Controls */}
      <div className="mb-4 flex gap-2 text-teal-900 dark:text-teal-100 transition-colors duration-200">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="border px-2 py-1 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder:text-teal-900 dark:placeholder:text-teal-100 focus:placeholder:opacity-0"
          aria-label="Filter by name"
          autoComplete="off"
        />
        <button
          onClick={() => setSortAsc((s) => !s)}
          className="border px-2 py-1 rounded cursor-pointer dark:hover:bg-teal-800 hover:bg-teal-100"
          aria-label="Toggle Sort Order"
        >
          Sort: {sortAsc ? "Asc" : "Desc"}
        </button>
        <button
          onClick={() => {
            setFilter("");
            setPageSize(filtered.length || 1);
            setSortAsc(true);
            setPage(1);
          }}
          className="border px-2 py-1 rounded cursor-pointer dark:hover:bg-teal-800 hover:bg-teal-100"
          aria-label="Reset"
        >
          Reset
        </button>
      </div>
      {/* Chart */}
      <ResponsiveContainer height={400} width="100%">
        <PieChart>
          <Pie
            data={paginatedChartData}
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
                  <div className={toolTipTheme}>
                    <p>{`${payload[0].name}: ${payload[0].value} ${tooltipDesc}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Pagination */}
      <div className="mt-2 flex gap-2 items-center text-teal-900 dark:text-teal-100">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="border px-2 py-1 rounded cursor-pointer dark:hover:bg-teal-800 hover:bg-teal-100 disabled:opacity-50 disabled:!bg-transparent disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="border px-2 py-1 rounded cursor-pointer dark:hover:bg-teal-800 hover:bg-teal-100 disabled:opacity-50 disabled:!bg-transparent disabled:cursor-not-allowed"
          aria-label="Next Page"
        >
          Next
        </button>
        {/* Show All Data Button */}
        <button
          onClick={() => {
            setPageSize(filtered.length || 1);
            setPage(1);
          }}
          className="border px-2 py-1 rounded cursor-pointer dark:hover:bg-teal-800 hover:bg-teal-100"
        >
          Show All
        </button>
        {/* Count Per Page Selector */}
        <label className="ml-2">
          <span className="mr-1">Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 cursor-pointer dark:hover:bg-teal-800 hover:bg-teal-100"
          >
            {perPageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
