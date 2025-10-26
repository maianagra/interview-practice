import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchableDropdown from "./SearchableDropdown";

describe("Button Component", () => {
  const items = [
    { id: 1, label: "banana" },
    { id: 2, label: "orange" },
    { id: 3, label: "apple" },
  ];

  it("should display the input field with placeholder", () => {
    render(<SearchableDropdown items={items} />);

    expect(screen.getByTestId("dropdown-input")).toHaveAttribute(
      "placeholder",
      "search"
    );
  });

  it("should filter the dropdown items on input change", () => {
    render(<SearchableDropdown items={items} />);

    // Filter down to one item left
    fireEvent.change(screen.getByTestId("dropdown-input"), {
      target: { value: "ba" },
    });

    fireEvent.focus(screen.getByTestId("dropdown-input"));

    expect(screen.queryByText("orange")).not.toBeInTheDocument();
    expect(screen.queryByText("apple")).not.toBeInTheDocument();
    expect(screen.queryByText("banana")).toBeInTheDocument();

    // Filter back to all items
    fireEvent.change(screen.getByTestId("dropdown-input"), {
      target: { value: "a" },
    });

    expect(screen.queryByText("orange")).toBeInTheDocument();
    expect(screen.queryByText("apple")).toBeInTheDocument();
    expect(screen.queryByText("banana")).toBeInTheDocument();
  });

  it("should clear the input on reset button click", () => {
    render(<SearchableDropdown items={items} />);

    // Add some text to the input
    fireEvent.change(screen.getByTestId("dropdown-input"), {
      target: { value: "ba" },
    });

    // Verify this text is added
    expect(screen.getByTestId("dropdown-input")).toHaveAttribute("value", "ba");

    // Click reset
    fireEvent.click(screen.getByText("Reset"));

    // Verify this text is gone
    expect(screen.getByTestId("dropdown-input")).toHaveAttribute("value", "");
  });

  it("should set the selected item on item click", () => {
    render(<SearchableDropdown items={items} />);
    fireEvent.focus(screen.getByTestId("dropdown-input"));
    fireEvent.click(screen.getByText("banana"));

    expect(screen.getByTestId("selected-item")).toHaveTextContent("banana");
  });

  it("should open the dropdown on focus and close on blur", async () => {
    render(<SearchableDropdown items={items} />);
    fireEvent.focus(screen.getByTestId("dropdown-input"));

    expect(screen.queryByText("orange")).toBeInTheDocument();
    expect(screen.queryByText("apple")).toBeInTheDocument();
    expect(screen.queryByText("banana")).toBeInTheDocument();

    fireEvent.blur(screen.getByTestId("dropdown-input"));

    await vi.waitFor(() => {
      expect(screen.queryByText("orange")).not.toBeInTheDocument();
      expect(screen.queryByText("apple")).not.toBeInTheDocument();
      expect(screen.queryByText("banana")).not.toBeInTheDocument();
    });
  });
});
