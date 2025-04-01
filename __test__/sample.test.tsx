import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../app/page";

describe("Page", () => {
  it("renders the heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", {
      level: 1,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Welcome to the Page");
  });
});
