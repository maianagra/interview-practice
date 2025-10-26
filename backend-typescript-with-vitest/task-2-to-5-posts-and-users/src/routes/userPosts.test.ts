import request from "supertest";
import app from "../app";
import { describe, it, expect } from "vitest";

describe("GET /userPosts route", () => {
  it("should return 200 and a list of combined user post counts", async () => {
    const res = await request(app).get("/userPosts");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});