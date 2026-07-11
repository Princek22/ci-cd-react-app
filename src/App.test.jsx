import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App component", () => {
  it("renders the application heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /automatic deployment test/i,
      })
    ).toBeInTheDocument();
  });
});
