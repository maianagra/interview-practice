import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EditableUserCard from "./EditableUserCard";

describe("EditableUserCard component", () => {
  it("should render in view mode initially", () => {
    render(<EditableUserCard />);

    expect(screen.getByText("View Mode")).toBeVisible();
    expect(screen.queryByText("Edit Mode")).not.toBeInTheDocument();
  });

  it("should change to edit mode on edit button click", () => {
    render(<EditableUserCard />);

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Edit Mode")).toBeVisible();
    expect(screen.queryByText("View Mode")).not.toBeInTheDocument();
  });

  it("should not persist changes when you cancel on edit mode", () => {
    render(<EditableUserCard />);

    // Switch to edit mode, add a name, and cancel
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByTestId("Name-input"), {
      target: { value: "changed name" },
    });
    fireEvent.click(screen.getByText("Cancel"));

    // Verify we have switched back to edit mode
    expect(screen.getByText("View Mode")).toBeVisible();
    expect(screen.queryByText("Edit Mode")).not.toBeInTheDocument();

    expect(screen.queryByText("Name: changed name")).not.toBeInTheDocument();
  });

  it("should persist changes when you save on edit mode", () => {
    render(<EditableUserCard />);

    // Switch to edit mode, add a name, and cancel
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByTestId("Name-input"), {
      target: { value: "changed name" },
    });
    fireEvent.click(screen.getByText("Save"));

    // Verify we have switched back to edit mode
    expect(screen.getByText("View Mode")).toBeVisible();
    expect(screen.queryByText("Edit Mode")).not.toBeInTheDocument();

    expect(screen.queryByText("Name: changed name")).toBeInTheDocument();
  });
});
