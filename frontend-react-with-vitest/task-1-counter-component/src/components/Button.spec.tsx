import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import { describe, it } from "vitest";

describe("Button Component", () => {
  it("renders with the correct text and triggers on click function", () => {
    // Arrange
    const mockClick = vi.fn();
    const mockText = "Mock Text";

    // Act
    render(<Button text={mockText} clickEvent={mockClick} />);
    fireEvent.click(screen.getByText(mockText));

    // Assert
    expect(screen.getByText(mockText)).toBeInTheDocument();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
