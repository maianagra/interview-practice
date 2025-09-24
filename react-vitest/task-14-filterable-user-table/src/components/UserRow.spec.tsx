import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserRow from "./UserRow";

describe("UserRow Component", () => {
  it("should display with the correct text and active state", () => {
    const name = "name";
    const email = "email";
    const active = true;
    const onActiveChange = vi.fn();

    render(
      <UserRow
        name={name}
        email={email}
        active={active}
        onActiveChange={onActiveChange}
      />
    );

    expect(screen.getByText(name)).toBeVisible();
    expect(screen.getByText(email)).toBeVisible();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("should trigger the on active change function on active checkbox change", () => {
    const name = "name";
    const email = "email";
    const active = true;
    const onActiveChange = vi.fn();

    render(
      <UserRow
        name={name}
        email={email}
        active={active}
        onActiveChange={onActiveChange}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"))

    expect(onActiveChange).toHaveBeenCalled()
  });
});
