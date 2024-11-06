import { screen, render, fireEvent } from "@testing-library/react";
import { NotFoundPage } from "./NotFoundPage";
import { BrowserRouter, useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NotFoundPage", () => {
  it("NotFound page renders", () => {
    render(<NotFoundPage />, { wrapper: BrowserRouter });
    const notFoundElement = screen.getByText(/Not found/i);
    expect(notFoundElement).toBeInTheDocument();
  });

  it("Home page redirect to home page", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    render(<NotFoundPage />, { wrapper: BrowserRouter });
    const homeButton = screen.getByText(/home/i);
    expect(homeButton).toBeInTheDocument();
    fireEvent.click(homeButton);
    expect(navigate).toHaveBeenCalledWith("/star-wars-data");
  });
});
