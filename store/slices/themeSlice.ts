import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: 
    typeof window !== "undefined" &&
    (localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
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
