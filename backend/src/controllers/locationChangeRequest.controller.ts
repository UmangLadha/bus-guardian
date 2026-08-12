import { Request, Response } from "express";
import { LocationChangeRequestServices } from "../services/locationChangeRequest.services";

export class LocationChangeRequestController {
  static async createRequest(req: Request, res: Response) {
    try {
      const { studentId, parentPhoneNo, requestedCheckpoint, reason } = req.body;
      if (!studentId || !parentPhoneNo || !requestedCheckpoint) {
        res.status(400).json({
          message: "studentId, parentPhoneNo, and requestedCheckpoint are required",
        });
        return;
      }

      const result = await LocationChangeRequestServices.createRequest(
        studentId,
        parentPhoneNo,
        requestedCheckpoint,
        reason
      );

      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(201).json(result);
      return;
    } catch (error) {
      console.error("Error creating location change request:", error);
      res.status(500).json({ message: "Failed to create request" });
      return;
    }
  }

  static async getRequestsByParent(req: Request, res: Response) {
    try {
      const { phoneNo } = req.params;
      const result = await LocationChangeRequestServices.getRequestsByParent(phoneNo);
      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Failed to fetch requests" });
      return;
    }
  }

  static async getAllRequests(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const result =
        status === "pending"
          ? await LocationChangeRequestServices.getAllPendingRequests()
          : await LocationChangeRequestServices.getAllRequests();
      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error fetching all requests:", error);
      res.status(500).json({ message: "Failed to fetch requests" });
      return;
    }
  }

  static async respondToRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status || !["approved", "rejected"].includes(status)) {
        res.status(400).json({ message: "Status must be 'approved' or 'rejected'" });
        return;
      }

      const result = await LocationChangeRequestServices.respondToRequest(id, status);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error responding to request:", error);
      res.status(500).json({ message: "Failed to respond to request" });
      return;
    }
  }
}
