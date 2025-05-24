import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggler from "../ThemeToggler";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as themeSlice from "@/store/slices/themeSlice";

// components/ThemeToggler.test.tsx

// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Helper to render with mocked store
function renderWithStore(isDark = false, dispatch = jest.fn()) {
  const store = {
    getState: () => ({ theme: { isDark } }),
    subscribe: jest.fn(),
    dispatch,
    replaceReducer: jest.fn(),
    [Symbol.observable]: jest.fn(),
  };
  return render(
    <Provider store={store as any}>
      <ThemeToggler />
    </Provider>
  );
}

describe("ThemeToggler", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders the toggle button with correct aria-label", () => {
    renderWithStore();
    expect(
      screen.getByRole("button", { name: /toggle dark mode/i })
    ).toBeInTheDocument();
  });

  it("button has dark class when isDark=true", () => {
    renderWithStore(true);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-teal-900/);
  });

  it("button has light class when isDark=false", () => {
    renderWithStore(false);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-teal-50/);
  });

  it("dispatches toggleTheme when clicked", () => {
    const dispatch = jest.fn();
    renderWithStore(false, dispatch);
    fireEvent.click(screen.getByRole("button"));
    expect(dispatch).toHaveBeenCalledWith(themeSlice.toggleTheme());
  });

  it("dispatches setTheme('dark') if localStorage is dark", () => {
    const dispatch = jest.fn();
    localStorage.setItem("theme", "dark");
    renderWithStore(false, dispatch);
    expect(dispatch).toHaveBeenCalledWith(themeSlice.setTheme("dark"));
  });

  it("dispatches setTheme('light') if localStorage is light", () => {
    const dispatch = jest.fn();
    localStorage.setItem("theme", "light");
    renderWithStore(true, dispatch);
    expect(dispatch).toHaveBeenCalledWith(themeSlice.setTheme("light"));
  });

  it("dispatches setTheme based on matchMedia if no localStorage", () => {
    const dispatch = jest.fn();
    // Simulate prefers-color-scheme: dark
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    renderWithStore(false, dispatch);
    expect(dispatch).toHaveBeenCalledWith(themeSlice.setTheme("dark"));
  });
});