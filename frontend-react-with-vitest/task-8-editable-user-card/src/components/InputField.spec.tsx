import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField component", () => {
  it("should render with the correct label and value", () => {
    const title = "title";
    const value = "value";

    render(<InputField title={title} value={value} onChangeAction={vi.fn()} />);

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByRole("textbox")).toHaveAttribute("value", value);
  });

  it("should trigger the on change action on change", () => {
    const title = "title";
    const value = "value";
    const onChangeFunction = vi.fn();

    render(
      <InputField
        title={title}
        value={value}
        onChangeAction={onChangeFunction}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });

    expect(onChangeFunction).toHaveBeenCalled()
  });
});
