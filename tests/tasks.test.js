import request from "supertest";
import app from "../src/app";
import Task from "../src/models/Task";
import mongoose from "mongoose";

beforeEach(async () => {
  await Task.deleteMany();
});

describe("POST /tasks", () => {
  describe("given a title and description", () => {
    test("should respond with Status Code 200", async () => {
      const result = await request(app).post("/tasks").send({
        title: "title",
        description: "description",
      });

      expect(result.statusCode).toBe(201);
    });

    test("should contain a JSON header", async () => {
      const result = await request(app).post("/tasks").send({
        title: "title",
        description: "description",
      });
      expect(result.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should respond with a title and description", async () => {
      const result = await request(app).post("/tasks").send({
        title: "title",
        description: "description",
      });
      expect(result.body).toMatchObject({
        title: "title",
        description: "description",
      });
    });

    test("if a response has an _id", async () => {
      const response = await request(app).post("/tasks").send({
        title: "title",
        description: "description",
      });
      expect(response.body._id).toBeDefined();
    });
  });
  describe("when the title and description is missing", () => {
    test("should response with a status code of 400", async () => {
      const bodyData = [
        {},
        { title: "some title" },
        { description: "some description" },
      ];
      for (const body in bodyData) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });

  afterAll(async () => {
    mongoose.disconnect();
  });
});
