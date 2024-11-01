import { fireEvent, render, screen } from "@testing-library/react";
import { ErrorView } from "./ErrorView";

describe("Error", () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: original,
    });
  });

  it("Render Error component with refresh button", () => {
    render(<ErrorView />);
    const errorButton = screen.getByRole("button", { name: /reload page/i });
    expect(errorButton).toBeInTheDocument();
  });

  it("reload button refresh the page", () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true); //mocks reload function
    render(<ErrorView />);
    const errorButton = screen.getByRole("button", { name: /reload page/i });
    fireEvent.click(errorButton);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
