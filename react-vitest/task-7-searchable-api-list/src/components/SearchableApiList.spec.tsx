import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import SearchableApiList from "./SearchableApiList";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("SearchableApiList Component", () => {
  it("should call the api on load", () => {
    global.fetch = vi.fn().mockResolvedValue([]);
    render(<SearchableApiList />);

    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it("should display the no posts state when no posts are returned", async () => {
    const response =  { json: vi.fn().mockResolvedValue([]) }
    global.fetch = vi.fn().mockResolvedValue(response);
    render(<SearchableApiList />);

    expect(await screen.findByText("No posts to show")).toBeVisible()
  });


  it("should display loading while the api is fetching", async () => {
    render(<SearchableApiList />);
    expect(screen.getByText("loading ...")).toBeVisible()
  });

  it("should display an error on api error", async () => {
    const response =  { json: vi.fn().mockRejectedValue(new Error("error message")) }
    global.fetch = vi.fn().mockRejectedValue(new Error("error message"));
    
    render(<SearchableApiList />);
    expect(await screen.findByText("No posts to show")).toBeVisible()
    expect(await screen.findByTestId("error")).toBeVisible()
  });
});
