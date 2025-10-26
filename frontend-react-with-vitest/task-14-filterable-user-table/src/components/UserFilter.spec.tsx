import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserFilter from "./UserFilter";

it("should trigger the on change function on input change", () => {
  const onChangeAction = vi.fn();

  render(<UserFilter onChangeAction={onChangeAction} />);
  fireEvent.change(screen.getByRole("search"), {
    target: { value: "new value" },
  });

  expect(onChangeAction).toHaveBeenCalledOnce()
});
