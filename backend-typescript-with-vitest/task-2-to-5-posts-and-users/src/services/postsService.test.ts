import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPosts, fetchPostsByUserId } from "./postsService";

vi.mock("../utils/api");
vi.mock("../utils/posts");
import { fetchFromApi } from "../utils/api";
import { transformPosts } from "../utils/posts";

describe("fetchPosts", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and transform posts", async () => {
    // Mock the API response
    const mockResponse = [{ id: 1, title: "hello" }];
    vi.mocked(fetchFromApi).mockResolvedValueOnce(mockResponse);
    const mockTransformed = [{ id: 1, title: "hello", shortTitle: "hello" }];
    vi.mocked(transformPosts).mockReturnValueOnce(mockTransformed);

    // Call the function
    const result = await fetchPosts();

    // Assertions
    expect(Array.isArray(result)).toBe(true);
    expect(transformPosts).toHaveBeenCalledWith(mockResponse.slice(0, 5));
  });

  it("should limit to first 5 posts", async () => {
    // Mock the API response with more than 5 posts
    const mockResponse = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `title ${i + 1}`,
    }));
    vi.mocked(fetchFromApi).mockResolvedValueOnce(mockResponse);
    const mockTransformed = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `title ${i + 1}`,
      shortTitle: `title ${i + 1}`,
    }));
    vi.mocked(transformPosts).mockReturnValueOnce(mockTransformed);

    // Call the function
    const result = await fetchPosts();

    // Assertions
    expect(result.length).toBe(5);
  });
});

describe("fetchPostsByUserId", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and transform posts", async () => {
    // Mock the API response
    const mockResponse = [{ id: 1, title: "hello", userId: 1 }];
    vi.mocked(fetchFromApi).mockResolvedValueOnce(mockResponse);
    const mockTransformed = [{ id: 1, title: "hello", shortTitle: "hello" }];
    vi.mocked(transformPosts).mockReturnValueOnce(mockTransformed);

    // Call the function
    const result = await fetchPostsByUserId(1);

    // Assertions
    expect(Array.isArray(result)).toBe(true);
    expect(transformPosts).toHaveBeenCalledWith(mockResponse);
  });

  it("should limit to just the matching userId", async () => {
    // Mock the API response with more than one userId
    const mockResponse = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `title ${i + 1}`,
      userId: i % 2 === 0 ? 1 : 2, // Alternate userIds
    }));
    vi.mocked(fetchFromApi).mockResolvedValueOnce(mockResponse);

    const mockTransformed = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `title ${i + 1}`,
      shortTitle: `title ${i + 1}`,
    }));
    vi.mocked(transformPosts).mockReturnValueOnce(
      mockTransformed.filter((post) => post.id % 2 === 1)
    );

    // Call the function
    const result = await fetchPostsByUserId(1);

    // Assertions
    expect(transformPosts).toHaveBeenCalledWith(
      mockResponse.filter((post) => post.userId === 1)
    );
    expect(result.every((post) => post.id % 2 === 1)).toBe(true);
  });
});
