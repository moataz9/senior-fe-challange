import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      const darkLightMode = state.isDark ? "dark" : "light";
      localStorage.setItem("theme", darkLightMode);
      document.documentElement.dataset.theme = darkLightMode;
    },
    setTheme: (state, action) => {
      state.isDark = action.payload === "dark";
      const darkLightMode = state.isDark ? "dark" : "light";
      localStorage.setItem("theme", darkLightMode);
      document.documentElement.dataset.theme = darkLightMode;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
