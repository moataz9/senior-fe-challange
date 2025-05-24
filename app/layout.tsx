import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import ThemeToggler from "@/components/ThemeToggler";
import { ReduxProvider } from "@/store/provider";
import { loadCountriesChartData } from "@/lib/loadCountriesChartData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senior FE Challenge",
  description: "GraphQL + Charts + Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chartData = await loadCountriesChartData();

  const preloadedState = {
    countries: {
      countriesByContinent: chartData.countriesChartData,
      languagesByContinent: chartData.languagesChartData,
      topCurrencies: chartData.currencyChartData,
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased dark:bg-teal-900 dark:text-teal-100 bg-teal-50 text-teal-950`}
      >
        <ReduxProvider preloadedState={preloadedState}>
          <nav className="flex items-center justify-between px-4">
            <SideBar />
            <h1 className="text-3xl font-bold text-teal-600 mt-4">
              Senior FE Challenge
            </h1>
            <ThemeToggler />
          </nav>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
