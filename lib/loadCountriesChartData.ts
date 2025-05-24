// lib/loadCountriesChartData.ts
import { client } from "@/lib/apolloClient";
import { GET_COUNTRIES, type Country } from "@/graphql/queries/getCountries";

export async function loadCountriesChartData() {
  const { data } = await client.query({
    query: GET_COUNTRIES,
  });

  const countries = data.countries as Country[];

  const countriesByContinent = countries.reduce(
    (acc: Record<string, number>, country: Country) => {
      const continent = country.continent.name || "Unknown";
      acc[continent] = (acc[continent] || 0) + 1;
      return acc;
    },
    {}
  );
  const countriesChartData = Object.entries(countriesByContinent).map(
    ([name, value]) => ({ name, value })
  );

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
    ([name, languages]) => ({ name, value: languages.size })
  );

  const currencyCounts = countries.reduce(
    (acc: Record<string, number>, country: Country) => {
      const currencies =
        country.currency?.split(",").map((c) => c.trim()) || ["Unknown"];
      currencies.forEach((currency) => {
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

  return {
    countriesChartData,
    languagesChartData,
    currencyChartData,
  };
}
