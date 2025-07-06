import { Request, Response } from "express";
import { AdminServices } from "../services/admin.services";

export class AdminController {
  static async registerAdmin(req: Request, res: Response) {
    try {
      const { email, phoneNo, password } = req.body;
      if (!email || !phoneNo || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const result = await AdminServices.registerAdmin(
        email,
        phoneNo,
        password
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(201).json({
        message: `Admin registered successfully`,
        token: result.accessToken,
      });
      return;
    } catch (error) {
      console.error("error in creating the admin:", error);
      res
        .status(500)
        .json({ message: "error in adding admin in database", error });
      return;
    }
  }

  static async adminLogin(req: Request, res: Response) {
    try {
      const { email, password, token } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const result = await AdminServices.adminLogin(email, password, token);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res.status(201).json({
        message: "Admin authenticate successfully",
        token: result.accessToken,
      });
      return;
    } catch (error) {
      console.log("error in authenticating admin", error);
      res.status(400).json({ message: "error in authenticating admin", error });
    }
  }

  static async adminProfile(req: Request, res: Response) {
    try {
      const adminData = req.encodedPayload;
      const result = await AdminServices.findAdmin(adminData.id);
      res.status(200).json({ admin: result.admin });
      return;
    } catch (error) {
      console.error("Error in fetching data", error);
      res.status(400).json({ message: "Error in fetching data", error });
      return;
    }
  }

  static async deleteAdminById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AdminServices.deleteAdminById(id);
      res.status(200).json({
        message: "Admin deleted successfully",
      });
      return;
    } catch (error) {
      console.log("error in deleting the Admin:", error);
      res.status(500).json({ message: "error in deleting the Admin" });
      return;
    }
  }
}
