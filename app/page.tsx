"use client";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import AppPie from "@/components/charts/AppPie";
import AppLine from "@/components/charts/AppLine";
import AppBar from "@/components/charts/AppBar";
import Link from "next/link";

export default function Home() {
  const countriesChartData = useSelector(
    (state: RootState) => state.countries.countriesByContinent
  );

  return (
    <div className="mb-16">
      <section className="flex flex-col justify-center items-center-safe">
        <AppPie
          title="Countries per Continent"
          tooltipDesc="countries"
          chartData={countriesChartData}
        />
        <div>
          <Link
            href="/pie-charts"
            className="text-xl font-bold text-teal-600 capitalize px-3 underline underline-offset-4"
            role="link"
            aria-label="Link To Pie Charts page"
          >
            show more
          </Link>
        </div>
      </section>
      {/* =============================================== */}
      <section className="flex flex-col justify-center items-center-safe">
        <AppLine
          title="Countries per Continent"
          lineName="Continents"
          tooltipDesc="countries"
          chartData={countriesChartData}
        />
        <div>
          <Link
            href="/line-charts"
            className="text-xl font-bold text-teal-600 capitalize px-3 underline underline-offset-4"
            role="link"
            aria-label="Link To Line Charts page"
          >
            show more
          </Link>
        </div>
      </section>
      {/* =============================================== */}
      <section className="flex flex-col justify-center items-center-safe">
        <AppBar
          title="Countries per Continent"
          lineName="Continents"
          tooltipDesc="countries"
          chartData={countriesChartData}
        />
        <div>
          <Link
            href="/bar-charts"
            className="text-xl font-bold text-teal-600 capitalize px-3 underline underline-offset-4"
            role="link"
            aria-label="Link To Pie Charts page"
          >
            show more
          </Link>
        </div>
      </section>
    </div>
  );
}
