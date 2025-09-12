
import request from "supertest";
import express from "express";
import { AdminController } from "../controllers/admin.controller";
import { AdminServices } from "../services/admin.services";
import adminRoutes from "../routes/admin.routes";

// Mock the AdminServices
jest.mock("../services/admin.services");

const app = express();
app.use(express.json());
app.use("/admin", adminRoutes);

describe("Admin Controller", () => {
  describe("POST /admin/login", () => {
    it("should return a token when login is successful", async () => {
      const mockToken = "mock-token";
      (AdminServices.adminLogin as jest.Mock).mockResolvedValue({
        success: true,
        accessToken: mockToken,
      });

      const response = await request(app)
        .post("/admin/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Admin authenticate successfully",
        token: mockToken,
      });
    });

    it("should return a 400 error when login fails", async () => {
      (AdminServices.adminLogin as jest.Mock).mockResolvedValue({
        success: false,
        message: "Invalid credentials",
      });

      const response = await request(app)
        .post("/admin/login")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid credentials" });
    });

    it("should return a 400 error if email or password are not provided", async () => {
      const response = await request(app)
        .post("/admin/login")
        .send({ email: "test@example.com" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "All fields are required" });
    });
  });
});
