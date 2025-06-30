import { Request, Response } from "express";
import { AdminServices } from "../services/admin.services";

export class AdminController {
  static async registerAdmin(req: Request, res: Response) {
    try {
      const { adminId, phoneNo, password } = req.body;
      if (!adminId || !phoneNo || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const result = await AdminServices.registerAdmin(
        adminId,
        phoneNo,
        password
      );
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res
        .status(201)
        .json({
          message: `Admin registered successfully`,
          newAdmin: result.newAdmin, 
          token: result.accessToken,
        });
    } catch (error) {
      console.error("error in creating the admin:", error);
      res
        .status(500)
        .json({ message: "error in adding admin in database", error });
    }
  }

  static async adminLogin(req: Request, res: Response) {
    try {
      const { adminId, password } = req.body;
      const result = await AdminServices.adminLogin(adminId, password);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }
      res
        .status(201)
        .json({
          message: "Admin authenticate successfully",
          token: result.accessToken,
        });
    } catch (error) {
      console.log("error in authenticating admin", error);
      res.status(400).json({ message: "error in authenticating admin", error });
    }
  }

  static async getAllAdmin(req: Request, res: Response) {
    try {
      const result = await AdminServices.findAllAdmin();
      res.status(200).json({ admins: result.admins });
    } catch (error) {
      console.error("Error in fetching data", error);
      res.status(400).json({ message: "Error in fetching data", error });
    }
  }

  static async deleteAdminById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await AdminServices.deleteAdminById(id);
      res.status(200).json({
        message: "Admin deleted successfully",
      });
    } catch (error) {
      console.log("error in deleting the Admin:", error);
      res.status(500).json({ message: "error in deleting the Admin" });
    }
  }
}
