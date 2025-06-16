import { Request, Response } from "express";
import { Types } from "mongoose"
import Admin from "../models/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AdminUser {
  _id: Types.ObjectId;
  username: string;
  phoneNo: number;
  password: string;
}

export class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { username, phoneNo, password } = req.body;
      if (!username || !phoneNo || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const existingUser = await Admin.findOne({ username });
      if (existingUser) {
        res.status(400).json({ message: "Username already exists" });
        return;
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await Admin.create({
        username,
        phoneNo,
        password: hashedPassword,
      });
      console.log(`User register successfully ${newUser._id}`);
      res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
      console.error("error in creating the user:", error);
      res.status(500).json({ message: "error in adding user in database" });
    }
  }

  private static createJwtToken(user:AdminUser) {
    const accessToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "1h" }
    );
    return accessToken;
  }

  static async adminLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await Admin.findOne({ username });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        res.status(404).json({ message: "Incorrect Password!" });
        return;
      }
      const accessToken = UserController.createJwtToken(user);
      res
        .status(201)
        .json({ message: "Admin authenticate successfully", accessToken });
    } catch (error) {
      console.log("error in authenticating admin", error);
      res.status(400).json({ message: "error in authenticating user" });
    }
  }

  static async getAdmin(req: Request, res: Response) {
    try {
      const users = await Admin.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error in fetching data", error);
      res.status(400).json({ message: "Error in fetching data", error });
    }
  }
}
