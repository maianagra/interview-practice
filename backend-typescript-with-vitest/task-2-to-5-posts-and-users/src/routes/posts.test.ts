import request from "supertest";
import app from "../app";
import { describe, it, expect } from "vitest";

describe("GET /posts route", () => {
  it("should return 200 and a list of posts", async () => {
    const res = await request(app).get("/posts");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /posts/:id route", () => {
  it("should return 200 and a list of posts", async () => {
    const res = await request(app).get("/posts/1");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
