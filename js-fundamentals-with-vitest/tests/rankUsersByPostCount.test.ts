import { describe, it, expect } from "vitest";
import {
  UserWithPosts,
  RankedUser,
  rankUsersByPostCount,
} from "../src/utils/rankUsersByPostCount";

describe("rankUsersByPostCount", () => {
  it("should return the top users ranked by number of posts", () => {
    // Arrange
    const users: UserWithPosts[] = [
      { id: 1, name: "Alice", posts: [{}, {}] },
      { id: 2, name: "Bob", posts: [{}] },
    ];
    const expectedResult: RankedUser[] = [
      { id: 1, name: "Alice", postCount: 2 },
      { id: 2, name: "Bob", postCount: 1 },
    ];

    // Act
    const result = rankUsersByPostCount(users);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it("should sort the ranked users descending by post count", () => {
    // Arrange
    const users: UserWithPosts[] = [
      { id: 1, name: "Alice", posts: [{}] },
      { id: 2, name: "Bob", posts: [{}, {}, {}, {}] },
    ];
    const expectedResult: RankedUser[] = [
      { id: 2, name: "Bob", postCount: 4 },
      { id: 1, name: "Alice", postCount: 1 },
    ];

    // Act
    const result = rankUsersByPostCount(users);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
