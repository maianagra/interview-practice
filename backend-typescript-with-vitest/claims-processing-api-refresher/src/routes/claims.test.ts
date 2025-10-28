import request from "supertest";
import app from "../app";
import { describe, it, expect } from "vitest";

describe("GET /claims", () => {
  it("should return 200 and a valid JSON response", async () => {
    const res = await request(app).get("/claims");

    expect(res.status).toBe(200);
  });
});

describe("GET /claims?status=", () => {
  it("should return 200 and a valid JSON response", async () => {
    const res = await request(app).get("/claims?status=approved");

    expect(res.status).toBe(200);
    expect(
      res.body.every((c: any) => c.status.toLowerCase() === "approved")
    ).toBe(true);
  });

  it("should return an empty array for a non matching status", async () => {
    const res = await request(app).get("/claims?status=arandomstatus");

    expect(res.body).toEqual([]);
  });
});
