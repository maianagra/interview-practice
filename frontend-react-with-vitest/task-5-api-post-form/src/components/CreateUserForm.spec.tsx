import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateUserForm from "./CreateUserForm";

vi.mock("../api", () => ({
  fetchWithTimeout: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

import { fetchWithTimeout } from "../api";

describe("CreateUserForm Component", () => {
  it("should show three input fields empty initially", () => {
    render(<CreateUserForm />);

    expect(screen.getByTestId("Name-input")).toBeVisible();
    expect(screen.getByTestId("Username-input")).toBeVisible();
    expect(screen.getByTestId("Email-input")).toBeVisible();
  });

  it("should call the api with entered data on submit click", () => {
    render(<CreateUserForm />);

    fireEvent.change(screen.getByTestId("Name-input"), {
      target: { value: "test 1" },
    });
    fireEvent.change(screen.getByTestId("Email-input"), {
      target: { value: "test 2" },
    });
    fireEvent.change(screen.getByTestId("Username-input"), {
      target: { value: "test 3" },
    });

    fireEvent.click(screen.getByText("submit"));

    expect(fetchWithTimeout).toHaveBeenCalledWith("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "test 1",
        email: "test 2",
        username: "test 3",
      }),
    });
  });

  it("should show loading text while the api call is ongoing", () => {
    render(<CreateUserForm />);

    fireEvent.change(screen.getByTestId("Name-input"), {
      target: { value: "test 1" },
    });
    fireEvent.change(screen.getByTestId("Email-input"), {
      target: { value: "test 2" },
    });
    fireEvent.change(screen.getByTestId("Username-input"), {
      target: { value: "test 3" },
    });

    fireEvent.click(screen.getByText("submit"));

    expect(screen.getByText("loading ...")).toBeVisible();
  });

  it("should show a success message on api success", async () => {
    render(<CreateUserForm />);

    fireEvent.change(screen.getByTestId("Name-input"), {
      target: { value: "test 1" },
    });
    fireEvent.change(screen.getByTestId("Email-input"), {
      target: { value: "test 2" },
    });
    fireEvent.change(screen.getByTestId("Username-input"), {
      target: { value: "test 3" },
    });

    fireEvent.click(screen.getByText("submit"));

    await vi.waitFor(() => {
      expect(
        screen.queryByText("Successfully submitted your data.")
      ).toBeInTheDocument();
    });
  });

  it("should show an error message on api error", async () => {
    (fetchWithTimeout as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("error message")
    );
    render(<CreateUserForm />);

    fireEvent.change(screen.getByTestId("Name-input"), {
      target: { value: "test 1" },
    });
    fireEvent.change(screen.getByTestId("Email-input"), {
      target: { value: "test 2" },
    });
    fireEvent.change(screen.getByTestId("Username-input"), {
      target: { value: "test 3" },
    });

    fireEvent.click(screen.getByText("submit"));

    await vi.waitFor(() => {
      expect(screen.queryByText("error message")).toBeInTheDocument();
    });
  });

  it("should show an error when fields are empty", async () => {
    render(<CreateUserForm />);

    fireEvent.click(screen.getByText("submit"));

    await vi.waitFor(() => {
      expect(
        screen.queryByText(
          "Inputs cannot be empty. Please fill in all fields and try again."
        )
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("Email-input"), {
      target: { value: "test 2" },
    });
    fireEvent.change(screen.getByTestId("Username-input"), {
      target: { value: "test 3" },
    });

    fireEvent.click(screen.getByText("submit"));

    await vi.waitFor(() => {
      expect(
        screen.queryByText(
          "Inputs cannot be empty. Please fill in all fields and try again."
        )
      ).toBeInTheDocument();
    });
  });
});
