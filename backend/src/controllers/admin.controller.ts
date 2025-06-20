import { Request, Response } from "express";
import { AdminServices } from "../services/admin.services";

export class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { username, phoneNo, password } = req.body;
      if (!username || !phoneNo || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const result = await AdminServices.registerAdmin(
        username,
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
          message: `user registered successfully`,
          admin: result.newUser,
        });
    } catch (error) {
      console.error("error in creating the user:", error);
      res
        .status(500)
        .json({ message: "error in adding user in database", error });
    }
  }

  static async adminLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await AdminServices.adminLogin(username, password);
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
      res.status(400).json({ message: "error in authenticating user", error });
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
