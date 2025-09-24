import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import Post from "./Post";

describe("Post Component", () => {
  it("should render with the correct title and body", () => {
    const title = "title";
    const body = "body";

    render(<Post title={title} body={body} />);

    expect(screen.getByText(title)).toBeVisible()
    expect(screen.getByText(body)).toBeVisible()
  });
});
