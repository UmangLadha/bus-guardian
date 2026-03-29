
import request from "supertest";
import express from "express";
import { DriverController } from "../controllers/driver.controller";
import { DriverServices } from "../services/driver.services";
import driverRoutes from "../routes/driver.routes";

// Mock the DriverServices
jest.mock("../services/driver.services");

// Mock the verifyToken middleware
import { Request, Response, NextFunction } from "express";

jest.mock("../middlewares/verifyToken", () => ({
  VerifyToken: (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(express.json());
app.use("/drivers", driverRoutes);

describe("Driver Controller", () => {
  describe("GET /drivers", () => {
    it("should return a list of drivers", async () => {
      const mockDrivers = [
        {
          _id: "1",
          driverName: "John Doe",
          driverPhoneNo: 1234567890,
          assignedBus: {
            _id: "bus1",
            busNumber: "BUS123",
          },
        },
        {
          _id: "2",
          driverName: "Jane Doe",
          driverPhoneNo: 9876543210,
        },
      ];

      (DriverServices.getAllDrivers as jest.Mock).mockResolvedValue({
        success: true,
        drivers: mockDrivers,
      });

      const response = await request(app).get("/drivers");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ drivers: mockDrivers });
    });

    it("should return a 500 error if there is an error fetching drivers", async () => {
      (DriverServices.getAllDrivers as jest.Mock).mockRejectedValue(
        new Error("Error fetching drivers")
      );

      const response = await request(app).get("/drivers");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "error in fetching the drivers",
      });
    });
  });
});
