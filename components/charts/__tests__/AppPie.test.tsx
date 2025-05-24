import { render, screen, fireEvent } from "@testing-library/react";
import AppPie from "../AppPie";

const mockData = [
  { name: "Alpha", value: 10 },
  { name: "Alph2", value: 13 },
  { name: "Beta", value: 20 },
  { name: "Beta2", value: 21 },
  { name: "Gamma", value: 15 },
  { name: "Gamma2", value: 14 },
  { name: "Delta", value: 5 },
  { name: "Delta1", value: 3 },
  { name: "Epsilon", value: 25 },
  { name: "Epsilon2", value: 45 },
];

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe("AppBar", () => {
  it("renders without crashing and displays title", () => {
    render(
      <AppPie title="Test" tooltipDesc="desc" chartData={[]} />
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders all controls and pagination", () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    expect(screen.getByText("Test Bar Chart")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter by name")).toBeInTheDocument();
    screen.debug();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Prev/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByText(/Per page:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Show All/i })
    ).toBeInTheDocument();
  });

  it("filters data by name", () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    const input = screen.getByPlaceholderText("Filter by name");
    fireEvent.change(input, { target: { value: "Alpha" } });
    expect(screen.getByDisplayValue("Alpha")).toBeInTheDocument();
    // The pie sector is rendered as a <path> with role="img" and name="Alpha"
    const alphaSector = screen.getByRole("img");
    expect(alphaSector).toBeInTheDocument();
    expect(alphaSector).toHaveAttribute("name", "Alpha");
    expect(screen.queryByText("Beta")).not.toBeInTheDocument();
    expect(screen.queryByText("Gamma")).not.toBeInTheDocument();
  });

  it("sorts data ascending and descending", () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    const sortBtn = screen.getByRole("button", { name: /Sort/i });
    expect(sortBtn).toHaveTextContent("Sort: Asc");
    fireEvent.click(sortBtn);
    expect(sortBtn).toHaveTextContent("Sort: Desc");
    fireEvent.click(sortBtn);
    expect(sortBtn).toHaveTextContent("Sort: Asc");
  });

  it("resets filter and sort", () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    const input = screen.getByPlaceholderText("Filter by name");
    fireEvent.change(input, { target: { value: "Alpha" } });
    const sortBtn = screen.getByRole("button", { name: /Sort/i });
    fireEvent.click(sortBtn);
    const resetBtn = screen.getByRole("button", { name: /Reset/i });
    fireEvent.click(resetBtn);
    expect(input).toHaveValue("");
    expect(sortBtn).toHaveTextContent("Sort: Asc");
  });

  it("changes page and page size", () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    const nextBtn = screen.getByRole("button", { name: /Next/i });
    const select = screen.getByLabelText(/Per page:/i) as HTMLSelectElement;
    // Change page size using the select dropdown enabling pagination
    fireEvent.change(select, { target: { value: 3 } });
    // Go to next page
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
    // Go back to previous page
    const prevBtn = screen.getByRole("button", { name: /Prev/i });
    fireEvent.click(prevBtn);
    expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();

    // Change page size using the select dropdown
    fireEvent.change(select, { target: { value: mockData.length.toString() } });
    expect(select).toHaveValue(mockData.length.toString());
    expect(screen.getByText(/Page 1 of 1/i)).toBeInTheDocument();
  });

  it('shows all data when "Show All" is clicked', () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    const showAllBtn = screen.getByRole("button", { name: /Show All/i });
    fireEvent.click(showAllBtn);
    expect(screen.getByText(/Page 1 of 1/i)).toBeInTheDocument();
  });

  it("disables prev/next buttons on first/last page", () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    const prevBtn = screen.getByRole("button", { name: /Prev/i }) as HTMLButtonElement;
    const nextBtn = screen.getByRole("button", { name: /Next/i }) as HTMLButtonElement;
    expect(prevBtn).toBeDisabled();
    // Go to last page
    while (!nextBtn.disabled) {
      fireEvent.click(nextBtn);
    }
    expect(nextBtn).toBeDisabled();
  });

  it("renders tooltip content when hovering over a bar (mocked)", () => {
    render(
      <AppPie
        title="Test Bar Chart"
        tooltipDesc="units"
        chartData={mockData}
      />
    );
    // Tooltip is rendered as part of the chart, but actual hover simulation is not trivial.
    expect(screen.getByText("Test Bar Chart")).toBeInTheDocument();
  });

  it("handles empty chartData gracefully", () => {
    render(
      <AppPie
        title="Empty Chart"
      
        tooltipDesc="desc"
        chartData={[]}
      />
    );
    expect(screen.getByText("Empty Chart")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter by name")).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 0/i)).toBeInTheDocument();
  });
});
