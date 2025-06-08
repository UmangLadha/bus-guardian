import { Request, Response } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createJwtToken = (user: any) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "1h" }
  );
  return accessToken;
};

export class UserController {
  public static async registerUser(req: Request, res: Response) {
    try {
      const { username, phoneNo, password } = req.body;
      if (!username || !phoneNo || !password) {
        res.status(404).json({ message: "All fields are required" });
        return;
      }
      const existingUser = await Admin.findOne({ username });
      if (existingUser) {
        res.status(404).json({ message: "Username already exists" });
        return;
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await Admin.create({
        username,
        phoneNo,
        password: hashedPassword,
      });
      console.log(`User register successfully ${newUser.username}`);
      res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
      console.error("error in creating the user:", error);
      res.status(500).json({ message: "error in adding user in database" });
    }
  }

  public static async adminLogin(req: Request, res: Response) {
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
      const accessToken = createJwtToken(user);
      res
      .status(201)
      .json({ message: "Admin authenticate successfully", accessToken });
    } catch (error) {
      console.log("error in authenticating admin", error);
      res.status(400).json({ message: "error in authenticating user" });
    }
  }

  public static async getAdmin(req: Request, res: Response) {
    try {
      const users = await Admin.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error in fetching data", error);
      res.status(400).json({ message: "Error in fetching data", error });
    }
  }
}
