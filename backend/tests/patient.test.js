// tests/patient.test.js
import request from "supertest";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import patientRoutes from "../routes/patientRoutes";
import Patient from "../models/patientModel";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/patients", patientRoutes);

describe("Patient API", () => {
  beforeAll(async () => {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/";
    // optional options can help with some mongoose versions
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 20000); // increase timeout for slow DB connections if needed

  afterAll(async () => {
    await Patient.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Patient.deleteMany({});
  });

  test("GET /patients returns array with at least 2 patients", async () => {
    await Patient.create([
      { id: 1, name: "John Doe", age: 54, status: "Stable" },
      { id: 2, name: "Jane Smith", age: 47, status: "Critical" },
    ]);

    const response = await request(app).get("/patients");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("age");
    expect(response.body[0]).toHaveProperty("status");
  });

  test("GET /patients returns correct patient data", async () => {
    await Patient.create({ id: 1, name: "John Doe", age: 54, status: "Stable" });

    const response = await request(app).get("/patients");

    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe("John Doe");
    expect(response.body[0].age).toBe(54);
    expect(response.body[0].status).toBe("Stable");
  });
});
