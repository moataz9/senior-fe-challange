"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import countriesReducer from "./slices/countriesSlice";

export function ReduxProvider({ children, preloadedState }: { children: ReactNode, preloadedState?: unknown }) {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
      countries: countriesReducer,
    },
    preloadedState
  });
  return <Provider store={store}>{children}</Provider>;
}
