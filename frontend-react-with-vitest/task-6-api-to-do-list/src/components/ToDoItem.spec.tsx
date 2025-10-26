// src/components/ToDoItem.spec.tsx
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ToDoItem from "./ToDoItem";

describe("ToDoItem Component", () => {
  it("should display with the correct text and checkbox state", () => {
    const title = "title";
    const completed = true;

    render(
      <ToDoItem title={title} completed={completed} checkItem={vi.fn()} />
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("should call the checkItem prop on checkbox change", () => {
    const title = "title";
    const completed = true;
    const checkItem = vi.fn();

    render(
      <ToDoItem title={title} completed={completed} checkItem={checkItem} />
    );
    fireEvent.click(screen.getByRole("checkbox"));

    expect(checkItem).toHaveBeenCalled();
  });
});
