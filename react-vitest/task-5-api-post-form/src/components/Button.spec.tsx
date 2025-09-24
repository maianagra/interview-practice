import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("should display with the correct text", () => {
    const text = "text";

    render(<Button text={text} onClickAction={vi.fn()} />);

    expect(screen.getByText(text)).toBeVisible();
  });

  it("should trigger the on click function when clicked", () => {
    const text = "text";
    const clickFunction = vi.fn();

    render(<Button text={text} onClickAction={clickFunction} />);
    fireEvent.click(screen.getByText(text));

    expect(clickFunction).toHaveBeenCalledOnce();
  });
});
