import { afterEach, describe, expect, it, vi } from "vitest";
import { Request, Response } from "express";
import { getUserPosts } from "./userPostsController";

vi.mock("../services/userPostsService");
import { fetchUsersPosts } from "../services/userPostsService";

describe("getUserPosts", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return combined user and post data on successful fetch", async () => {
    // Mock the request and response objects
    const req = {} as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn(),
    } as unknown as Response;

    // Mock the service response
    const mockResponse = [
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
        postCount: 3,
      },
    ];

    vi.mocked(fetchUsersPosts).mockResolvedValue(mockResponse);

    await getUserPosts(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it("should handle known errors from the service", async () => {
    // Mock the request and response objects
    const req = {} as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock the service response
    const error = { status: 404, message: "User posts not found" };
    vi.mocked(fetchUsersPosts).mockRejectedValueOnce(error);

    // Call the controller
    await getUserPosts(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User posts not found" });
  });

  it("should handle unexpected errors", async () => {
    // Mock the request and response objects
    const req = {} as Request;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    // Mock the service to throw an unexpected error
    vi.mocked(fetchUsersPosts).mockRejectedValueOnce(
      new Error("Unexpected error")
    );

    // Call the controller
    await getUserPosts(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch user posts",
    });
  });
});
