import { afterEach, describe, expect, it, vi } from "vitest";
import { Request, Response } from "express";
import { getPosts, getPostsByUserId } from "./postsController";

vi.mock("../services/postsService");
import { fetchPosts, fetchPostsByUserId } from "../services/postsService";

describe("getPosts", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return posts on successful fetch", async () => {
    // Mock the request and response objects
    const req = {} as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn(),
    } as unknown as Response;

    // Mock the service response
    const mockPosts = [
      { id: 1, title: "Post 1", shortTitle: "Post" },
      { id: 2, title: "Post 2", shortTitle: "Post" },
    ];
    vi.mocked(fetchPosts).mockResolvedValueOnce(mockPosts);

    // Call the controller
    await getPosts(req, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it("should handle known errors from the service", async () => {
    // Mock the request and response objects
    const req = {} as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock the service response
    const error = { status: 404, message: "Posts not found" };
    vi.mocked(fetchPosts).mockRejectedValueOnce(error);

    // Call the controller
    await getPosts(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Posts not found" });
  });

  it("should handle unexpected errors", async () => {
    // Mock the request and response objects
    const req = {} as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock the service to throw an unexpected error
    vi.mocked(fetchPosts).mockRejectedValueOnce(new Error("Unexpected error"));

    // Call the controller
    await getPosts(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch posts" });
  });
});

describe("getPostsByUserId", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return posts on successful fetch", async () => {
    // Mock the request and response objects
    const req = { params: { id: 1 } } as unknown as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn(),
    } as unknown as Response;

    // Mock the service response
    const mockPosts = [
      { id: 1, title: "Post 1", shortTitle: "Post" },
      { id: 2, title: "Post 2", shortTitle: "Post" },
    ];
    vi.mocked(fetchPostsByUserId).mockResolvedValueOnce(mockPosts);

    // Call the controller
    await getPostsByUserId(req, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it("should handle no posts found", async () => {
    // Mock the request and response objects
    const req = { params: { id: 1 } } as unknown as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock the service response
    vi.mocked(fetchPostsByUserId).mockResolvedValueOnce([]);

    // Call the controller
    await getPostsByUserId(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No posts found for this user",
    });
  });

  it("should handle an invalid id", async () => {
    // Mock the request and response objects
    const req = { params: { id: "invalid" } } as unknown as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Call the controller
    await getPostsByUserId(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid ID",
    });
  });

  it("should handle known errors from the service", async () => {
    // Mock the request and response objects
    const req = { params: { id: 1 } } as unknown as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock the service response
    const error = { status: 404, message: "Posts not found" };
    vi.mocked(fetchPostsByUserId).mockRejectedValueOnce(error);

    // Call the controller
    await getPostsByUserId(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Posts not found" });
  });

  it("should handle unexpected errors", async () => {
    // Mock the request and response objects
    const req = { params: { id: 1 } } as unknown as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock the service to throw an unexpected error
    vi.mocked(fetchPostsByUserId).mockRejectedValueOnce(
      new Error("Unexpected error")
    );

    // Call the controller
    await getPostsByUserId(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch posts" });
  });
});
