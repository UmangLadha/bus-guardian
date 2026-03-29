
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { busController } from "../controllers/bus.controller";
import { BusServices } from "../services/bus.services";
import busRoutes from "../routes/bus.routes";

// Mock the BusServices
jest.mock("../services/bus.services");

// Mock the verifyToken middleware
jest.mock("../middlewares/verifyToken", () => ({
  VerifyToken: (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(express.json());
app.use("/bus", busRoutes);

describe("Bus Controller", () => {
  describe("GET /bus", () => {
    it("should return a list of buses", async () => {
      const mockBuses = [
        {
          _id: "1",
          busNumber: "BUS-001",
          busCapacity: 50,
        },
        {
          _id: "2",
          busNumber: "BUS-002",
          busCapacity: 40,
        },
      ];

      (BusServices.findAllBus as jest.Mock).mockResolvedValue({
        success: true,
        buses: mockBuses,
      });

      const response = await request(app).get("/bus");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ buses: mockBuses });
    });

    it("should return a 500 error if there is an error fetching buses", async () => {
      (BusServices.findAllBus as jest.Mock).mockRejectedValue(
        new Error("Error fetching buses")
      );

      const response = await request(app).get("/bus");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "error in fetching the buses" });
    });
  });
});
