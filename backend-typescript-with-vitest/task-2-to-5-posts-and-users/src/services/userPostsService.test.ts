import { describe, it, expect, afterEach, vi } from "vitest";
import { fetchUsersPosts } from "./userPostsService";

vi.mock("../utils/api");
import { fetchFromApi } from "../utils/api";

describe("userPostsService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch users and posts, combine them, and return sorted usersPosts", async () => {
    const mockUsers = [
      { id: 1, name: "User One", email: "userone@example.com", other: "data" },
      { id: 2, name: "User Two", email: "usertwo@example.com", other: "data" },
    ];
    const mockPosts = [
      { id: 1, userId: 1, title: "Post One", body: "Content One" },
      { id: 2, userId: 2, title: "Post Two", body: "Content Two" },
      { id: 3, userId: 1, title: "Post Three", body: "Content Three" },
    ];

    const expectedResponse = [
      {
        id: 1,
        name: "User One",
        email: "userone@example.com",
        postCount: 2,
      },
      {
        id: 2,
        name: "User Two",
        email: "usertwo@example.com",
        postCount: 1,
      },
    ];

    vi.mocked(fetchFromApi)
      .mockResolvedValueOnce(mockUsers)
      .mockResolvedValueOnce(mockPosts);

    const result = await fetchUsersPosts();

    expect(fetchFromApi).toHaveBeenCalledTimes(2);
    expect(fetchFromApi).toHaveBeenNthCalledWith(
      1,
      "https://jsonplaceholder.typicode.com/users"
    );
    expect(fetchFromApi).toHaveBeenNthCalledWith(
      2,
      "https://jsonplaceholder.typicode.com/posts"
    );
    expect(result).toEqual(expectedResponse);
  });
});
