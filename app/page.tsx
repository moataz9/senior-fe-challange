"use client";
import { useQuery } from "@apollo/client";
import { type Country, GET_COUNTRIES } from "@/graphql/queries/getCountries";
import AppPie from "@/components/charts/AppPie";
import AppLine from "@/components/charts/AppLine";
import AppBar from "@/components/charts/AppBar";

export default function Home() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return;
  if (error) return <p>Error loading data</p>;

  const countries = data.countries as Country[];

  // ==========================================================
  // Countries per continent
  // ==========================================================
  const countriesByContinent = countries.reduce(
    (acc: Record<string, number>, country: Country) => {
      const continent = country.continent.name || "Unknown";
      acc[continent] = (acc[continent] || 0) + 1;
      return acc;
    },
    {}
  );
  const countriesChartData = Object.entries(countriesByContinent).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // ==========================================================
  // Languages per continent
  // ==========================================================
  const languagesByContinent = countries.reduce(
    (acc: Record<string, Set<string>>, country: Country) => {
      const continent = country.continent.name || "Unknown";
      if (!acc[continent]) acc[continent] = new Set();

      country.languages.forEach((lang) => {
        if (lang.name) acc[continent].add(lang.name);
      });

      return acc;
    },
    {}
  );
  const languagesChartData = Object.entries(languagesByContinent).map(
    ([name, languages]) => ({
      name,
      value: languages.size,
    })
  );

  // ==========================================================
  // Top 10 common currencies per countries
  // ==========================================================
  const currencyCounts = countries.reduce(
    (acc: Record<string, number>, country: Country) => {
      const currencies = country.currency?.split(",").map((c) => c.trim()) || [
        "Unknown",
      ];
      currencies.forEach((currency: string) => {
        acc[currency] = (acc[currency] || 0) + 1;
      });
      return acc;
    },
    {}
  );
  const currencyChartData = Object.entries(currencyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-teal-600 mt-4">
        Senior FE Challenge
      </h1>
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
      {/* =============================================== */}
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
      {/* =============================================== */}
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
