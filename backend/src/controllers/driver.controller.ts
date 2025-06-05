import Driver from "../models/driver.model";
import { Request, Response } from "express";
import { generateIDFor } from "../utility/generateID";

export class DriverController {
  public static async registerDriver(req: Request, res: Response) {
    try {
      const { driverName, driverPhoneNo, busAlloted } = req.body;
      if (!driverName || !driverPhoneNo || !busAlloted) {
        res.status(404).json({ message: "All fields are required" });
        return;
      }
      const uniqueID = generateIDFor("Driver");
      const newDriver = await Driver.create({
        driverID: uniqueID,
        driverName,
        driverPhoneNo,
        busAlloted,
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

  public static async loginDriver(req: Request, res: Response) {
    try {
      const { driverID } = req.body;
      const driver = await Driver.findOne({ driverID });
      if (!driver) {
        res.status(404).json({ message: "Driver not found" });
        return;
      }
      res.status(201).json({
        message: "driver login successfully",
      });
    } catch (error) {
      console.log("error in login the driver:", error);
      res.status(500).json({ message: "driver login failed" });
    }
  }

  public static async getDrivers(req: Request, res: Response) {
    try {
        const drivers = await Driver.find();
        res.status(200).json({drivers});
        
    } catch (error) {
      console.log("error in fetching the drivers:", error);
      res.status(500).json({ message: "error in fetching the drivers" });
    }
  }

  public static async updateDriverById(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const {driverName, driverPhoneNo, busAlloted} =req.body;
        const updatedDriver = await Driver.findByIdAndUpdate(id,{ driverName, driverPhoneNo, busAlloted}, {new:true});
        if(!updatedDriver){
            res.status(200).json({message:"No driver found!"});
            return;
        }
         res.status(200).json({message:"driver Updated Succesfully", updatedDriver});
    } catch (error) {
        console.log("error in updating the drivers:", error);
      res.status(500).json({ message: "error in updating the drivers" });
    }
  }

  public static async deleteDriverById(req: Request, res: Response) {
    try {
      const { driverId } = req.params;
      await Driver.findByIdAndDelete({ _id: driverId });
      res.status(201).json({
        message: "driver deleted successfully",
      });
    } catch (error) {
      console.log("error in deleting the driver:", error);
      res.status(500).json({ message: "error in deleting the driver" });
    }
  }
}
