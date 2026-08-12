import { Request, Response } from "express";
import { AlertServices } from "../services/alert.services";

export class AlertController {
  static async createAlert(req: Request, res: Response) {
    try {
      const { type, busId, busNumber, message, targetParents } = req.body;
      if (!type || !busId || !message || !targetParents) {
        res.status(400).json({ message: "type, busId, message, and targetParents are required" });
        return;
      }

      const result = await AlertServices.createAlert(
        type,
        busId,
        busNumber,
        message,
        targetParents
      );

      res.status(201).json(result);
      return;
    } catch (error) {
      console.error("Error creating alert:", error);
      res.status(500).json({ message: "Failed to create alert" });
      return;
    }
  }

  static async getAlertsByParent(req: Request, res: Response) {
    try {
      const { phoneNo } = req.params;
      const { recent } = req.query;

      const result =
        recent === "true"
          ? await AlertServices.getRecentAlertsByParent(phoneNo)
          : await AlertServices.getAlertsByParent(phoneNo);

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error fetching alerts:", error);
      res.status(500).json({ message: "Failed to fetch alerts" });
      return;
    }
  }

  static async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await AlertServices.markAsRead(id);
      if (!result.success) {
        res.status(404).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error marking alert as read:", error);
      res.status(500).json({ message: "Failed to mark alert as read" });
      return;
    }
  }
}
