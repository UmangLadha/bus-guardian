import { Request, Response } from "express";
import { SchoolServices } from "../services/school.services";

export class SchoolController {
  static async getSchoolInfo(req: Request, res: Response) {
    try {
      const result = await SchoolServices.getSchoolInfo();
      if (!result.success) {
        res.status(404).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error fetching school info:", error);
      res.status(500).json({ message: "Failed to fetch school info" });
      return;
    }
  }

  static async upsertSchoolInfo(req: Request, res: Response) {
    try {
      const { schoolName, contactPhone, contactEmail, address } = req.body;
      if (!schoolName || !contactPhone) {
        res.status(400).json({ message: "schoolName and contactPhone are required" });
        return;
      }

      const result = await SchoolServices.upsertSchoolInfo(
        schoolName,
        contactPhone,
        contactEmail,
        address
      );

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error updating school info:", error);
      res.status(500).json({ message: "Failed to update school info" });
      return;
    }
  }
}
