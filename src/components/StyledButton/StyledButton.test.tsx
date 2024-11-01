import { fireEvent, render, screen } from "@testing-library/react";
import { StyledButton } from "./StyledButton";

describe("Styled Button", () => {
  it("Render styled button", () => {
    render(<StyledButton onClick={() => {}} children="button" />);
    const buttonElement = screen.getByRole("button", { name: "button" });
    expect(buttonElement).toBeInTheDocument();
  });

  it("Render styled button work properly", () => {
    const handleClick = jest.fn();
    render(<StyledButton onClick={handleClick} children="button" />);
    const buttonElement = screen.getByRole("button", { name: "button" });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
