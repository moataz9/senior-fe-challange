"use client";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import AppBar from "@/components/charts/AppBar";

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
        <AppBar
          title="Countries per Continent"
          lineName="Continents"
          tooltipDesc="countries"
          chartData={countriesChartData}
        />
        <AppBar
          title="Languages per Continent"
          lineName="Continents"
          tooltipDesc="languages"
          chartData={languagesChartData}
        />
        <AppBar
          title="Top 10 Common Currencies Per Countries"
          lineName="Currencies"
          tooltipDesc="countries"
          chartData={currencyChartData}
        />
      </section>
    </div>
  );
}
