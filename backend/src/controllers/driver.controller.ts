import Driver from "../models/driver.model";
import { Request, Response } from "express";
import { generateIDFor } from "../utility/generateID";
import Bus from "../models/bus.model";

export class DriverController {
    static async registerDriver(req: Request, res: Response) {
    try {
      const { driverName, driverPhoneNo } = req.body;
      if (!driverName || !driverPhoneNo) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      // const bus = await Bus.findOne({busNumber});
      // if (!bus) {
      //   res.status(404).json({ message: "bus not found" });
      //   return;
      // }
      const uniqueID = generateIDFor("Driver");
      const newDriver = await Driver.create({
        driverId: uniqueID,
        driverName,
        driverPhoneNo,
        // busAssigned: bus._id,
      });
      res.status(201).json({
        message: `Driver Register Successfully`,
        newDriver,
      });
    } catch (error) {
      console.log("error in registering the driver:", error);
      res.status(500).json({ message: "driver registration failed" });
    }
  }

    static async loginDriver(req: Request, res: Response) {
    try {
      const { driverId } = req.body;
      const driver = await Driver.findOne({ driverId });
      if (!driver) {
        res.status(400).json({ message: "Driver not found" });
        return;
      }
      res.status(200).json({
        message: "driver login successfully",
      });
    } catch (error) {
      console.log("error in login the driver:", error);
      res.status(500).json({ message: "driver login failed" });
    }
  }

    static async getDrivers(req: Request, res: Response) {
    try {
      const drivers = await Driver.find().populate("busAssigned");
      res.status(200).json({ drivers });
    } catch (error) {
      console.log("error in fetching the drivers:", error);
      res.status(500).json({ message: "error in fetching the drivers" });
    }
  }

    static async updateDriverById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { driverName, driverPhoneNo, busNumber } = req.body;
      const bus = await Bus.findOne({ busNumber });
      if (!bus) {
        res.status(404).json({ message: "bus not found" });
        return;
      }
      const updatedDriver = await Driver.findByIdAndUpdate(
        id,
        { driverName, driverPhoneNo, busAssigned: bus._id },
        { new: true }
      );
      if (!updatedDriver) {
        res.status(404).json({ message: "No driver found!" });
        return;
      }
      await Bus.findByIdAndUpdate(bus._id, { busDriver: updatedDriver._id });
      res
        .status(200)
        .json({ message: "Driver updated Succesfully", updatedDriver });
    } catch (error) {
      console.log("error in updating the drivers:", error);
      res.status(500).json({ message: "error in updating the drivers" });
    }
  }

    static async deleteDriverById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Driver.findByIdAndDelete(id);
      res.status(200).json({
        message: "driver deleted successfully",
      });
    } catch (error) {
      console.log("error in deleting the driver:", error);
      res.status(500).json({ message: "error in deleting the driver" });
    }
  }
}
