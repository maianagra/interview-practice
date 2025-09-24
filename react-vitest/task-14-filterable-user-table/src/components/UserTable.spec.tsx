import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserTable from "./UserTable";

beforeEach(() => {
  vi.clearAllMocks();
});
describe("UserTable Component", () => {
  it("should fetch users on mount", () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<UserTable />);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it("should show a loader while fetch is in progress", () => {
    render(<UserTable />);

    expect(screen.getByText("loading...")).toBeVisible();
  });

  it("should show an error and no table on api fetch error", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("message"));

    render(<UserTable />);

    expect(await screen.findByText("Error: message")).toBeVisible();
  });

  it("should show no users found on empty list return", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<UserTable />);

    expect(await screen.findByText("No Users Found.")).toBeVisible();
  });

  it("should show a row per user returned", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ name: "name", email: "email", id: 1 }]),
    });

    render(<UserTable />);

    expect(screen.queryAllByRole("checkbox").length == 1);
    expect(screen.queryByText("No Users Found.")).not.toBeInTheDocument();
  });
});
