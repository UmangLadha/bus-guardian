import { Request, Response } from "express";
import { BusServices } from "../services/bus.services";

export class busController {
  static async addBus(req: Request, res: Response) {
    try {
      const { busNumber, busCapacity, driverId } = req.body;
      if (!busNumber || !busCapacity) {
        res.status(400).json({ message: "all fields are required" });
        return;
      }
      const result = await BusServices.registerBus(
        busNumber,
        busCapacity,
        driverId
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res
        .status(201)
        .json({ message: "bus added successfully", bus: result.newBus });
    } catch (error) {
      console.log("error in adding bus", error);
      res.status(500).json({ message: "bus cannot be added" });
    }
  }

  static async getAllBuses(req: Request, res: Response) {
    try {
      const result = await BusServices.findAllBus();
      res.status(200).json({ buses: result.buses });
    } catch (error) {
      console.log("error in fetching the buses:", error);
      res.status(500).json({ message: "error in fetching the buses" });
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
    } catch (error) {
      console.log("error fetching the bus details:", error);
      res.status(500).json({ message: "error fetching the bus details" });
    }
  }

  static async updateBusById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { busNumber, driverId, busCapacity } = req.body;
      const result = await BusServices.updateBusById(
        id,
        busNumber,
        driverId,
        busCapacity
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(200).json({ message: "bus updated", bus: result.updatedBus });
    } catch (error) {
      console.log("error updating bus details:", error);
      res.status(500).json({ message: "error updating bus details" });
    }
  }

  static async deleteBusById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await BusServices.deleteBusById(id);
      res.status(200).json({
        message: "bus deleted successfully",
      });
    } catch (error) {
      console.log("error in deleting the bus:", error);
      res.status(500).json({ message: "error in deleting the bus" });
    }
  }
}
