
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { routeController } from "../controllers/route.controller";
import BusRoute from "../models/route.model";
import routes from "../routes/busRoute.route";

// Mock the BusRoute model
jest.mock("../models/route.model");

// Mock the verifyToken middleware
jest.mock("../middlewares/verifyToken", () => ({
  VerifyToken: (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(express.json());
app.use("/routes", routes);

describe("Route Controller", () => {
  describe("GET /routes", () => {
    it("should return a list of routes", async () => {
      const mockRoutes = [
        {
          _id: "1",
          routeName: "Route 1",
          locationsList: [],
        },
        {
          _id: "2",
          routeName: "Route 2",
          locationsList: [],
        },
      ];

      (BusRoute.find as jest.Mock).mockResolvedValue(mockRoutes);

      const response = await request(app).get("/routes");

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Data fetched Successfully",
        Routes: mockRoutes,
      });
    });

    it("should return a 500 error if there is an error fetching routes", async () => {
      (BusRoute.find as jest.Mock).mockRejectedValue(
        new Error("Error fetching routes")
      );

      const response = await request(app).get("/routes");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "unable to fetch busRoute" });
    });
  });
});
