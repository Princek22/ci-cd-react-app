import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("increments the count when the button is clicked", async () => {
    const user = userEvent.setup();

    render(<App />);

    const counterButton = screen.getByRole("button", {
      name: /count is 0/i,
    });

    await user.click(counterButton);

    expect(
      screen.getByRole("button", {
        name: /count is 1/i,
      })
    ).toBeInTheDocument();
  });
});
