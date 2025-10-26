import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

vi.mock("../api", () => ({
  fetchWithTimeout: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

import { fetchWithTimeout } from "../api";

describe("UserList Component", () => {
  it("should display loading text while the api call is in progress", () => {
    render(<UserList />);
    expect(screen.getByText("Loading users...")).toBeVisible();
  });

  it("should call the api on mount only", () => {
    render(<UserList />);
    expect(fetchWithTimeout).toBeCalledTimes(1);
    expect(fetchWithTimeout).toBeCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
  });

  it("should display an error message on api call failure", async () => {
    (fetchWithTimeout as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("An example error")
    );

    render(<UserList />);

    expect(fetchWithTimeout).toBeCalledTimes(1);
    expect(fetchWithTimeout).toBeCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(await screen.findByTestId("error-state")).toBeVisible();
    expect(screen.getByText("An example error")).toBeVisible();
    expect(screen.queryByText("Loading users...")).not.toBeInTheDocument();
  });

  it("should display the users in a list", async () => {
    (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      {
        id: 1,
        name: "name",
        username: "string",
        email: "string",
        address: {},
        phone: "string",
        website: "string",
        company: {},
      },
    ]);

    render(<UserList />);

    expect(fetchWithTimeout).toBeCalledTimes(1);
    expect(fetchWithTimeout).toBeCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(await screen.findByTestId("users-list")).toBeVisible();
    expect(screen.queryByText("No users found.")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading users...")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
  });

  it("should display the no users message when no users are returned", async () => {
    (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]);

    render(<UserList />);

    expect(fetchWithTimeout).toBeCalledTimes(1);
    expect(fetchWithTimeout).toBeCalledWith(
      "https://jsonplaceholder.typicode.com/users"
    );

    expect(await screen.findByText("No users found.")).toBeVisible();
    expect(screen.queryByTestId("users-list")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading users...")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
  });
});
