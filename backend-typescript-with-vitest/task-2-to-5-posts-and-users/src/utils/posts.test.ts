import { describe, it, expect } from "vitest";
import { transformPosts } from "./posts";
import { PostsResponse } from "../types/posts";

describe("transformPosts", () => {
  it("should transform posts correctly", () => {
    const input = [
      { id: 1, title: "This is a sample post title that is quite long" },
      { id: 2, title: "Short title" },
    ];

    const expectedOutput: PostsResponse = [
      {
        id: 1,
        title: "This is a sample post title that is quite long",
        shortTitle: "This is a sample pos",
      },
      { id: 2, title: "Short title", shortTitle: "Short title" },
    ];

    const result = transformPosts(input);
    expect(result).toEqual(expectedOutput);
  });
});
