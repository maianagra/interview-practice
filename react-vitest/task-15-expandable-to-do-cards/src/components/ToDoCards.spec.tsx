import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ToDoCards from "./ToDoCards";

beforeAll(() => {
  vi.clearAllMocks();
});

describe("ToDoCards Component", () => {
  it("should fetch todos on mount", () => {
    global.fetch = vi.fn();

    render(<ToDoCards />);

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
  });

  it("should load while fetch is ongoing", () => {
    global.fetch = vi.fn();

    render(<ToDoCards />);

    expect(screen.getByText("loading...")).toBeVisible();
  });

  it("should show an error on fetch error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("message"));

    render(<ToDoCards />);

    expect(await screen.findByText("Error: message")).toBeVisible();
  });

  it("should show no cards to show state on empty fetch return", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue({ json: () => Promise.resolve([]) });

    render(<ToDoCards />);

    expect(await screen.findByText("No Cards to Show.")).toBeVisible();
  });
});
