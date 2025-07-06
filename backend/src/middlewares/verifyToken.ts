import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const VerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ message: "Token not found" });
    return;
  }
  const authToken = authorization.split(" ")[1];
  if (!authToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!);
    req.encodedPayload = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
