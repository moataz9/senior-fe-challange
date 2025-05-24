"use client";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import AppLine from "@/components/charts/AppLine";

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
        <AppLine
          title="Countries per Continent"
          lineName="Continents"
          tooltipDesc="countries"
          chartData={countriesChartData}
        />
        <AppLine
          title="Languages per Continent"
          lineName="Continents"
          tooltipDesc="languages"
          chartData={languagesChartData}
        />
        <AppLine
          title="Top 10 Common Currencies Per Countries"
          lineName="Currencies"
          tooltipDesc="countries"
          chartData={currencyChartData}
        />
      </section>
    </div>
  );
}
