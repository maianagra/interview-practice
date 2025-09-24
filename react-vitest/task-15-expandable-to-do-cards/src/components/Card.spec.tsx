import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  const title = "title";
  const completed = true;
  const userId = 1;
  const id = 1;
  const onCompletedChange = vi.fn();
  const onTitleChange = vi.fn();

  it("should display the correct title and completed state", () => {
    render(
      <Card
        id={id}
        title={title}
        completed={completed}
        userId={userId}
        onCompletedChange={() => onCompletedChange()}
        onTitleChange={onTitleChange}
      />
    );

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("should be collapsed by default", () => {
    render(
      <Card
        id={id}
        title={title}
        completed={completed}
        userId={userId}
        onCompletedChange={() => onCompletedChange()}
        onTitleChange={onTitleChange}
      />
    );

    expect(screen.queryByText(userId)).not.toBeInTheDocument();
  });

  it("should expand on title click", () => {
    render(
      <Card
        id={id}
        title={title}
        completed={completed}
        userId={userId}
        onCompletedChange={() => onCompletedChange()}
        onTitleChange={onTitleChange}
      />
    );
    fireEvent.click(screen.getByText(title));
    expect(screen.queryByText(`User Id: ${userId}`)).toBeInTheDocument();
  });

  it("should call on change function on checkbox click", async () => {
    render(
      <Card
        id={id}
        title={title}
        completed={completed}
        userId={userId}
        onCompletedChange={() => onCompletedChange()}
        onTitleChange={onTitleChange}
      />
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
    fireEvent.click(screen.getByRole("checkbox"));

    expect(onCompletedChange).toHaveBeenCalledOnce();
  });

//   Test for title change
});
