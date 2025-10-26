import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DropdownItem from "./DropdownItem";

describe("DropdownItem Component", () => {
  it("should display with the correct text", () => {
    const label = "text";

    render(<DropdownItem label={label} setSelectedItem={vi.fn()} />);

    expect(screen.getByText(label)).toBeVisible();
  });

  it("should call the prop function on click", () => {
    const setSelected = vi.fn();
    const label = "text";

    render(<DropdownItem label={label} setSelectedItem={setSelected} />);
    fireEvent.click(screen.getByText(label));

    expect(setSelected).toHaveBeenCalledOnce();
    expect(setSelected).toHaveBeenCalledWith(label);
  });
});
