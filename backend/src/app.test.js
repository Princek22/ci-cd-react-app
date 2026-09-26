const request = require("supertest");
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");

const app = require("./app");

describe("Health API", () => {
  test("returns a healthy response", async () => {
    const response = await request(app)
      .get("/api/health")
      .expect(200);

    assert.equal(response.body.status, "ok");
  });
});