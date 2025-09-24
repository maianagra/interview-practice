import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("should render with the correct text", () => {
    const text = "Text";

    render(<Button text={text} onClickAction={vi.fn()} />);

    expect(screen.getByText(text)).toBeVisible();
  });

  it("should trigger the on click action function on click", () => {
    const text = "Text";
    const onClickAction = vi.fn();

    render(<Button text={text} onClickAction={onClickAction} />);
    fireEvent.click(screen.getByText(text));

    expect(onClickAction).toHaveBeenCalledOnce();
  });
});
