import { Request, Response } from "express";
import { TripServices } from "../services/trip.services";

export class TripController {
  static async startTrip(req: Request, res: Response) {
    try {
      const { driverId, busId, routeId } = req.body;
      if (!driverId || !busId || !routeId) {
        res.status(400).json({ message: "driverId, busId, and routeId are required" });
        return;
      }

      const result = await TripServices.startTrip(driverId, busId, routeId);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(201).json(result);
      return;
    } catch (error) {
      console.error("Error starting trip:", error);
      res.status(500).json({ message: "Failed to start trip" });
      return;
    }
  }

  static async updateLocation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { lat, lng } = req.body;
      if (lat === undefined || lng === undefined) {
        res.status(400).json({ message: "lat and lng are required" });
        return;
      }

      const result = await TripServices.updateLocation(id, lat, lng);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({ message: "Failed to update location" });
      return;
    }
  }

  static async completeTrip(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await TripServices.completeTrip(id);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error completing trip:", error);
      res.status(500).json({ message: "Failed to complete trip" });
      return;
    }
  }

  static async getActiveTrip(req: Request, res: Response) {
    try {
      const { busId } = req.params;
      const result = await TripServices.getActiveTrip(busId);
      if (!result.success) {
        res.status(404).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error getting active trip:", error);
      res.status(500).json({ message: "Failed to get active trip" });
      return;
    }
  }
}
