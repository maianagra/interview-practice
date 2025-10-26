// src/components/ToDoList.spec.tsx
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ToDoList from "./ToDoList";

vi.mock("../api", () => ({
  apiCall: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

import { apiCall } from "../api";

describe("ToDoList Component", () => {
  it("should call the api on load", () => {
    render(<ToDoList />);
    expect(apiCall).toHaveBeenCalledOnce();
  });

  it("should render a ToDoItem for each returned item", () => {
    (apiCall as ReturnType<typeof vi.fn>).mockReturnValueOnce([
      {
        userId: 1,
        id: 1,
        title: "string",
        completed: true,
      },
      {
        userId: 1,
        id: 2,
        title: "string",
        completed: false,
      },
    ]);

    render(<ToDoList />);
    expect(apiCall).toHaveBeenCalledOnce();

    expect(screen.getAllByRole("checkbox").length === 2);
  });
});
