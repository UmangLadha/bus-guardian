import { Request, Response } from "express";
import { BusServices } from "../services/bus.services";

export class busController {
  static async addBus(req: Request, res: Response) {
    try {
      const { busNumber, busCapacity, busDriverId, busRouteId } = req.body;
      if (!busNumber || !busCapacity) {
        res.status(400).json({ message: "all fields are required" });
        return;
      }
      const result = await BusServices.registerBus(
        busNumber,
        busCapacity,
        busDriverId,
        busRouteId
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res
        .status(201)
        .json({ message: "bus added successfully", bus: result.newBus });
      return;
    } catch (error) {
      console.log("error in adding bus", error);
      res.status(500).json({ message: "bus cannot be added" });
      return;
    }
  }

  static async getAllBuses(req: Request, res: Response) {
    try {
      const result = await BusServices.findAllBus();
      res.status(200).json({ buses: result.buses });
      return;
    } catch (error) {
      console.log("error in fetching the buses:", error);
      res.status(500).json({ message: "error in fetching the buses" });
      return;
    }
  }

  static async getBusById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "id not provided!" });
        return;
      }
      const result = await BusServices.getBusById(id);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(200).json({ bus: result.busData, student: result.students });
      return;
    } catch (error) {
      console.log("error fetching the bus details:", error);
      res.status(500).json({ message: "error fetching the bus details" });
      return;
    }
  }

  static async updateBusById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { busNumber, busDriverId, busRouteId, busCapacity } = req.body;
      const result = await BusServices.updateBusById(
        id,
        busNumber,
        busDriverId,
        busRouteId,
        busCapacity
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(200).json({ message: "bus updated", bus: result.updatedBus });
      return;
    } catch (error) {
      console.log("error updating bus details:", error);
      res.status(500).json({ message: "error updating bus details" });
      return;
    }
  }

  static async deleteBusById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await BusServices.deleteBusById(id);
      if (!deleted.success) {
        return res.status(404).json({ message: "Bus not found" });
      }
      res.status(200).json({
        message: "bus deleted successfully",
      });
      return;
    } catch (error) {
      console.log("error in deleting the bus:", error);
      res.status(500).json({ message: "error in deleting the bus" });
      return;
    }
  }
}
