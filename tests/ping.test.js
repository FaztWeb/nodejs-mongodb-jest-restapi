import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";

test("basic connection to server", async () => {
  const result = await request(app).get("/ping");
  expect(result.statusCode).toBe(200);
  expect(result.text).toMatch(/Pong!/);
});

afterAll(async () => {
  mongoose.disconnect();
});
