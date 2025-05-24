import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChartItem {
  name: string;
  value: number;
}

interface CountriesState {
  countriesByContinent: ChartItem[];
  languagesByContinent: ChartItem[];
  topCurrencies: ChartItem[];
}

const initialState: CountriesState = {
  countriesByContinent: [],
  languagesByContinent: [],
  topCurrencies: [],
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountriesChartData: (state, action: PayloadAction<ChartItem[]>) => {
      state.countriesByContinent = action.payload;
    },
    setLanguagesChartData: (state, action: PayloadAction<ChartItem[]>) => {
      state.languagesByContinent = action.payload;
    },
    setCurrenciesChartData: (state, action: PayloadAction<ChartItem[]>) => {
      state.topCurrencies = action.payload;
    },
  },
});

export const {
  setCountriesChartData,
  setLanguagesChartData,
  setCurrenciesChartData,
} = countriesSlice.actions;

export default countriesSlice.reducer;
