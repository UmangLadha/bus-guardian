import { Request, Response } from "express";
import Bus from "../models/bus.model";
import Driver from "../models/driver.model";
import Student from "../models/student.model";

export class busController {
    static async addBus(req: Request, res: Response) {
    try {
      const { busNumber, busCapacity} = req.body;
      if (!busNumber || !busCapacity) {
        res.status(400).json({ message: "all fields are required" });
        return;
      }
      //  const driver = await Driver.findOne({ driverId });
      // if (!driver) {
      //   res.status(404).json({ message: "driver not found" });
      //   return;
      // }
      const newBus = await Bus.create({
        busNumber,
        busCapacity,
        // busDriver: driver._id,
      });
      res.status(201).json({ message: "bus added successfully", newBus });
    } catch (error) {
      console.log("error in adding bus", error);
      res.status(500).json({ message: "bus cannot be added" });
    }
  }

     static async getBuses(req: Request, res: Response) {
    try {
      const buses = await Bus.find();
      res.status(200).json({ buses });
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
      const busData = await Bus.findById(id).populate("busDriver");
      const students = await Student.find({busAlloted: id});
      if (!busData) {
        res.status(404).json({ message: "Bus not found" });
        return;
      }
      res.status(200).json({busData, studentData:students});
    } catch (error) {
      console.log("error fetching the bus details:", error);
      res.status(500).json({ message: "error fetching the bus details" });
    }
  }

    static async updateBusById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { busNumber, driverId, busCapacity } = req.body;
      const driver = await Driver.findOne({ driverId });
      if (!driver) {
        res.status(404).json({ message: "driver not found" });
        return;
      }
      const updatedBus = await Bus.findByIdAndUpdate(
        id,
        { busNumber, busDriver: driver._id, busCapacity },
        { new: true }
      );
      if (!updatedBus) {
        res.status(200).json({ message: "No bus found!" });
        return;
      }
      await Driver.findByIdAndUpdate(driver._id, {busAssigned: updatedBus._id});
      res.status(200).json({ message: "bus updated", updatedBus });
    } catch (error) {
      console.log("error updating bus details:", error);
      res.status(500).json({ message: "error updating bus details" });
    }
  }

    static async deleteBus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Bus.findByIdAndDelete(id);
      res.status(200).json({
        message: "bus deleted successfully",
      });
    } catch (error) {
      console.log("error in deleting the bus:", error);
      res.status(500).json({ message: "error in deleting the bus" });
    }
  }
}
