import { describe, expect, it } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import SearchPosts from "./SearchPosts";

describe("SearchPosts Component", () => {
  it("should render with the correct value", () => {
    const value = "value";

    render(<SearchPosts value={value} onChangeAction={vi.fn()} />);

    expect(screen.getByRole("search")).toBeVisible();
    expect(screen.getByRole("search")).toHaveAttribute("value", value);
  });

  it("should trigger the on change action on change", () => {
    const value = "value";
    const onChangeAction = vi.fn();

    render(<SearchPosts value={value} onChangeAction={onChangeAction} />);

    fireEvent.change(screen.getByRole("search"), { target: { value: "test" } });

    expect(onChangeAction).toBeCalledWith("test");
  });
});
