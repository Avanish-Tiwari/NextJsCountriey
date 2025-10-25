import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

// Mocks for context/hooks and child components used by Home.jsx
jest.mock("./context/CountriesContext", () => ({
  useCountries: jest.fn(),
}));

jest.mock("./context/ThemeContext", () => ({
  useTheme: jest.fn(),
}));

// Simple UI component mocks
jest.mock("./ui/Search", () => () => <div data-testid="search" />);
jest.mock("./ui/Filter", () => (props) => (
  // expose handleRegion prop so tests can optionally call it if needed
  <div data-testid="filter" data-handle={!!props.handleRegion} />
));
jest.mock("./ui/Cards", () => (props) => (
  <div data-testid="cards">{props.countries ? props.countries.length : 0}</div>
));

const { useCountries } = require("./context/CountriesContext");
const { useTheme } = require("./context/ThemeContext");

describe("Home page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    // cleanup localStorage keys used by Home
    if (typeof window !== "undefined") {
      localStorage.removeItem("region");
      localStorage.removeItem("text");
    }
  });

  it("renders Search, Filter and Cards with countries", () => {
    useCountries.mockReturnValue({
      countries: [
        { cca3: "LTU", name: { common: "Lithuania" }, region: "Europe" },
        { cca3: "JPN", name: { common: "Japan" }, region: "Asia" },
      ],
      loading: false,
      error: null,
    });
    useTheme.mockReturnValue({ isDark: false });

    const Home = require("./Home").default;
    render(<Home />);

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("filter")).toBeInTheDocument();
    // Cards should receive 2 countries from the mocked context
    expect(screen.getByTestId("cards")).toHaveTextContent("2");
  });

  it("shows loading state when countries are loading", () => {
    useCountries.mockReturnValue({
      countries: [],
      loading: true,
      error: null,
    });
    useTheme.mockReturnValue({ isDark: false });

    const Home = require("./Home").default;
    render(<Home />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error state when context returns an error", () => {
    useCountries.mockReturnValue({
      countries: [],
      loading: false,
      error: "Failed to fetch",
    });
    useTheme.mockReturnValue({ isDark: false });

    const Home = require("./Home").default;
    render(<Home />);

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("loads persisted region from localStorage and filters countries on mount", async () => {
    // persist region before render
    if (typeof window !== "undefined") {
      localStorage.setItem("region", "Europe");
    }

    useCountries.mockReturnValue({
      countries: [
        { cca3: "LTU", name: { common: "Lithuania" }, region: "Europe" },
        { cca3: "JPN", name: { common: "Japan" }, region: "Asia" },
      ],
      loading: false,
      error: null,
    });
    useTheme.mockReturnValue({ isDark: false });

    const Home = require("./Home").default;
    render(<Home />);

    // wait for effect to set state and rerender Cards
    await waitFor(() => {
      expect(screen.getByTestId("cards")).toHaveTextContent("1");
    });
  });
});