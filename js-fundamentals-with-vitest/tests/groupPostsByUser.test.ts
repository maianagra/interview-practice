import { describe, it, expect } from "vitest";
import { groupPostsByUser, Post } from "../src/utils/groupPostsByUser";

describe("groupPostsByUser", () => {
  it("groups posts by user ID", () => {
    // Arrange
    const posts = [
      { id: 1, userId: 1, title: "Post 1" },
      { id: 2, userId: 1, title: "Post 2" },
      { id: 3, userId: 2, title: "Post 3" },
    ] as Post[];

    // Act
    const grouped = groupPostsByUser(posts);

    // Assert
    expect(grouped[1]).toEqual([
      { id: 1, userId: 1, title: "Post 1" },
      { id: 2, userId: 1, title: "Post 2" },
    ]);
    expect(grouped[2]).toEqual([{ id: 3, userId: 2, title: "Post 3" }]);
  });
});
