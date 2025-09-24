import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

describe("Button Component", () => {
  it("should display with the correct label", () => {
    const text = "text";

    render(<TextInput text={text} value={""} onChangeAction={vi.fn()} />);

    expect(screen.getByText(`${text}:`)).toBeVisible();
  });

  it("should trigger the function on change", () => {
    const text = "text";
    const changeFunction = vi.fn();

    render(
      <TextInput text={text} value={""} onChangeAction={changeFunction} />
    );
    fireEvent.change(screen.getByTestId(`${text}-input`), {
      target: { value: "ba" },
    });

    expect(changeFunction).toHaveBeenCalledOnce();
  });
});
