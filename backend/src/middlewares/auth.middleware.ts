import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authToken = req.headers["authorization"];
  if (!authToken) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
