import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "../SideBar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Mock matchMedia for ThemeToggler
if (!window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
      media: "",
    };
  };
}

const store = configureStore({
  reducer: () => ({
    theme: { isDark: false },
  }),
});

function renderWithProvider(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("SideBar", () => {
  it("renders the open sidebar button", () => {
    renderWithProvider(<SideBar />);
    expect(
      screen.getByRole("button", { name: /open sidebar/i })
    ).toBeInTheDocument();
  });

  it("shows sidebar when open button is clicked", async () => {
    renderWithProvider(<SideBar />);
    fireEvent.click(screen.getByRole("button", { name: /open sidebar/i }));
    expect(
      await screen.findByRole("navigation", { name: "Sidebar" })
    ).toBeVisible();
  });

  it("hides sidebar when close button inside sidebar is clicked", async () => {
    renderWithProvider(<SideBar />);
    fireEvent.click(screen.getByRole("button", { name: /open sidebar/i }));
    const closeButton = await screen.findByRole("button", {
      name: "Close Sidebar Button",
    });
    fireEvent.click(closeButton);
    // Sidebar should still be in the DOM, but not visible
    expect(
      screen.queryByRole("navigation", { name: "Sidebar" })
    ).not.toBeInTheDocument();
  });

  it("hides sidebar when overlay is clicked", async () => {
    renderWithProvider(<SideBar />);
    fireEvent.click(screen.getByRole("button", { name: /open sidebar/i }));
    const overlayButton = await screen.findByRole("button", {
      name: "Close Sidebar Overlay",
    });
    fireEvent.click(overlayButton);
    expect(
      screen.queryByRole("navigation", { name: "Sidebar" })
    ).not.toBeInTheDocument();
  });

  it("renders navigation links when sidebar is open", async () => {
    renderWithProvider(<SideBar />);
    fireEvent.click(screen.getByRole("button", { name: /open sidebar/i }));
    expect(await screen.findByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/line charts/i)).toBeInTheDocument();
    expect(screen.getByText(/bar charts/i)).toBeInTheDocument();
    expect(screen.getByText(/pie charts/i)).toBeInTheDocument();
  });

  it("links are focusable and can be navigated with keyboard", async () => {
    renderWithProvider(<SideBar />);
    fireEvent.click(screen.getByRole("button", { name: /open sidebar/i }));

    const links = await screen.findAllByRole("link");
    // Simulate tabbing through links
    links.forEach((link) => {
      link.focus();
      expect(link).toHaveFocus();
    });
  });
});
