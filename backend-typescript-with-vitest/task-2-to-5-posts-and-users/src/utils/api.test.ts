import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fetchFromApi } from "./api";
import { stat } from "fs";

describe("api utils", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const url = "https://api.example.com/data";

  it("should fetch data from the given URL and return JSON", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ key: "value" }),
    });

    const result = await fetchFromApi(url);

    expect(global.fetch).toHaveBeenCalledWith(url, {});
    expect(result).toEqual({ key: "value" });
  });

  it("should throw an error for non-200 responses", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false, // Simulate a failed response
      status: 404,
      statusText: "Not Found",
      json: async () => ({ message: "Not Found" }),
    });

    await expect(fetchFromApi(url)).rejects.toMatchObject({
      status: 404,
      message: "Failed to fetch: Not Found",
    });
  });

  it("should propagate network errors", async () => {
    const networkError = new Error("Network Error");
    (global.fetch as any).mockRejectedValueOnce(networkError);

    await expect(fetchFromApi(url)).rejects.toThrow("Network Error");
  });
});
