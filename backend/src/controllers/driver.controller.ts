
import { Request, Response } from "express";
import { DriverServices } from "../services/driver.services";

export class DriverController {
  static async registerDriver(req: Request, res: Response) {
    try {
      const { driverName, driverPhoneNo, busId } = req.body;
      if (!driverName || !driverPhoneNo) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const result = await DriverServices.registerDriver(
        driverName,
        driverPhoneNo,
        busId
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(201).json({
        message: `Driver Register Successfully`,
        driver: result.newDriver,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "driver registration failed" });
      return;
    }
  }

  static async loginDriver(req: Request, res: Response) {
    try {
      const { phoneNo } = req.body;
      const result = await DriverServices.loginDriver(phoneNo);
      if (!result.success) {
        res.status(400).json({ result });
        return;
      }
      res.status(200).json({
        result
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "driver verification failed" });
      return;
    }
  }

  static async getAllDrivers(req: Request, res: Response) {
    try {
      const result = await DriverServices.getAllDrivers();
      res.status(200).json({ drivers: result.drivers });
      return;
    } catch (error) {
      res.status(500).json({ message: "error in fetching the drivers" });
      return;
    }
  }

  static async getDriverById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await DriverServices.getDriverById(id);
      if (!result.success) {
        res.status(404).json({ message: result.message });
        return;
      }
      res.status(200).json({ driver: result.driver });
      return;
    } catch (error) {
      res.status(500).json({ message: "error in fetching the driver" });
      return;
    }
  }

  static async updateDriverById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { driverName, driverPhoneNo, busId } = req.body;
      const result = await DriverServices.updateDriverById(
        id,
        driverName,
        driverPhoneNo,
        busId
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(200).json({
        message: "Driver updated Succesfully",
        drivers: result.updatedDriver,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "error in updating the drivers" });
      return;
    }
  }

  static async deleteDriverById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await DriverServices.deleteDriverById(id);
      res.status(200).json({ message: "driver deleted successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "error in deleting the driver" });
      return;
    }
  }
}
