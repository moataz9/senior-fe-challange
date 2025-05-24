"use client";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import AppPie from "@/components/charts/AppPie";

export default function Home() {
  const countriesChartData = useSelector(
    (state: RootState) => state.countries.countriesByContinent
  );
  const languagesChartData = useSelector(
    (state: RootState) => state.countries.languagesByContinent
  );
  const currencyChartData = useSelector(
    (state: RootState) => state.countries.topCurrencies
  );

  return (
    <div>
      <section className="flex flex-wrap justify-center">
        <AppPie
          title="Countries per Continent"
          tooltipDesc="countries"
          chartData={countriesChartData}
        />
        <AppPie
          title="Languages per Continent"
          tooltipDesc="languages"
          chartData={languagesChartData}
        />
        <AppPie
          title="Top 10 Common Currencies Per Countries"
          tooltipDesc="countries"
          chartData={currencyChartData}
        />
      </section>
    </div>
  );
}
