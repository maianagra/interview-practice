import { describe, it, expect } from "vitest";
import { mergeUsersWithTheirPosts, User, Post, UserWithPosts } from "../src/utils/mergeUsersWithTheirPosts";

describe("mergeUsersWithTheirPosts", () => {
  it("groups posts by user ID", () => {
    // Arrange
    const users = [{ id: 1, name: "Alice" }] as User[];
    const posts = [
      { id: 1, userId: 1, title: "Post 1" },
      { id: 2, userId: 1, title: "Post 2" },
    ] as Post[];

    const expectedResult = [
      {
        id: 1,
        name: "Alice",
        posts: [
          { id: 1, title: "Post 1" },
          { id: 2, title: "Post 2" },
        ],
      },
    ] as UserWithPosts[];

    // Act
    const result = mergeUsersWithTheirPosts(users, posts);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
