import { describe, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ToDoListItem } from "./ToDoListItem";

describe("ToDoListItem Component", () => {
  it.each`
    state
    ${true}
    ${false}
  `("renders with the correct text and checkbox state", ({ state }) => {
    const item = {
      id: 123,
      text: "Item 1",
      done: state,
    };
    render(<ToDoListItem item={item} toggleDone={vi.fn()} />);

    expect(screen.getByText(item.text)).toBeVisible();
    const checkbox = screen.getByTestId(`${item.id}-checkbox`);

    if (state) {
      expect(checkbox).toBeChecked();
    } else {
      expect(checkbox).not.toBeChecked();
    }
  });

  it("calls the toggle function on checkbox change", () => {
    const item = {
      id: 123,
      text: "Item 1",
      done: true,
    };
    const toggleFunction = vi.fn();

    render(<ToDoListItem item={item} toggleDone={toggleFunction} />);
    fireEvent.click(screen.getByTestId(`${item.id}-checkbox`));

    expect(toggleFunction).toHaveBeenCalledTimes(1);
    expect(toggleFunction).toHaveBeenCalledWith(item.id);
  });
});
