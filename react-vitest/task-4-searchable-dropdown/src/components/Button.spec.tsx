import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("should display with the correct text", () => {
    const text = "example text";

    render(<Button text={text} onClickAction={vi.fn()} />);

    expect(screen.getByText(text)).toBeVisible();
  });

  it("should trigger the on click action when clicked", () => {
    const mockFunction = vi.fn()
    const text = "example text";

    render(<Button text={text} onClickAction={mockFunction} />);
    fireEvent.click(screen.getByText(text))

    expect(mockFunction).toHaveBeenCalledTimes(1)
  });
});
