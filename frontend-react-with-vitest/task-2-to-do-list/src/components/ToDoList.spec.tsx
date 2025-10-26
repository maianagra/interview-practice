import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToDoList from "./ToDoList";

describe("ToDoList Component", () => {
  const items = [
    { id: 1, text: "item 1", done: false },
    { id: 2, text: "item 2", done: true },
    { id: 3, text: "item 3", done: true },
    { id: 4, text: "item 4", done: false },
    { id: 5, text: "item 5", done: false },
  ];

  it("should render the completed items count before any user changes", () => {
    const expectedCount = items.filter((item) => item.done).length;

    render(<ToDoList items={items} />);
    expect(screen.getByTestId("done-count")).toHaveTextContent(
      expectedCount.toString()
    );
  });

  it("should update the completed count on checkbox update", () => {
    const initialCount = items.filter((item) => item.done).length;

    render(<ToDoList items={items} />);

    // Select an unchecked checkbox
    fireEvent.click(screen.getByTestId("1-checkbox"));
    expect(screen.getByTestId("1-checkbox")).toBeChecked();
    expect(screen.getByTestId("done-count")).toHaveTextContent(
      (initialCount + 1).toString()
    );

    // Unselect the same checkbox
    fireEvent.click(screen.getByTestId("1-checkbox"));
    expect(screen.getByTestId("1-checkbox")).not.toBeChecked();
    expect(screen.getByTestId("done-count")).toHaveTextContent(
      initialCount.toString()
    );

    // Unselect another checkbox
    fireEvent.click(screen.getByTestId("2-checkbox"));
    expect(screen.getByTestId("2-checkbox")).not.toBeChecked();
    expect(screen.getByTestId("done-count")).toHaveTextContent(
      (initialCount - 1).toString()
    );
  });

  it("should render an ToDoListItem component per item", () => {
    render(<ToDoList items={items} />);

    items.forEach((item) => {
      expect(screen.getByTestId(`${item.id}-checkbox`)).toBeInTheDocument();
    });
  });
});
