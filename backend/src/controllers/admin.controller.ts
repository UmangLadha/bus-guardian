import { Request, Response } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createJwtToken = (adminData: any) => {
  const accessToken = jwt.sign(
    { id: adminData._id },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "1h" }
  );
  return accessToken;
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { username, phoneNo, password } = req.body;
    if (!username || !phoneNo || !password) {
      res.status(404).json({ message: "All fields are required" });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = await Admin.create({
      Username: username,
      PhoneNo: phoneNo,
      Password: hashedPassword,
    });
    console.log("User added in database", newAdmin);
    res.status(201).json({ message: "user added in the database" });
  } catch (error) {
    console.error("error in creating the user:", error);
    res.status(500).json({ message: "error in adding user in database" });
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error in fetching data", error);
    res.status(400).json({ message: "Error in fetching data", error });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const adminData = await Admin.findOne({ Username: username });
    if (!adminData) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, adminData.Password);
    if (!checkPassword) {
      res.status(404).json({
        message: "Incorrect Password! Please check the password again",
      });
      return;
    }
    const accessToken = createJwtToken(adminData);
    res.status(201).json({
      message: "Admin authenticate successfully",
      accessToken,
    });
  } catch (error) {
    console.log("error in authenticating admin", error);
    res.status(400).json({ message: "error in authenticating admin" });
  }
};
