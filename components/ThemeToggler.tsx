"use client";

import { setTheme, toggleTheme } from "@/store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store";
import { useEffect } from "react";

export default function ThemeToggler() {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    dispatch(setTheme(isDark ? "dark" : "light"));
  }, []);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ease-in-out cursor-pointer border-2 border-teal-500
        ${isDark ? "bg-teal-900" : "bg-teal-50"}`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute left-1 top-1 size-5 rounded-full shadow-md transition-transform duration-300 ease-in-out
          ${isDark ? "bg-teal-50 translate-x-6" : "bg-teal-900 translate-x-0"}`}
      />
    </button>
  );
}
