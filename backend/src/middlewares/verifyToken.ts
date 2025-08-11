import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      encodedPayload?: string | jwt.JwtPayload;
    }
  }
}

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

  if (Array.isArray(authorization)) {
    res.status(400).json({ message: "Malformed Authorization header" });
    return;
  }
  const parts = authorization.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({ error: "Unauthorized: Invalid token format" });
    return;
  }

  const authToken = parts[1];

  if (!authToken) {
    res.status(401).json({ error: "Unauthorized: Token value missing" });
    return;
  }

  try {
    if (!process.env.JWT_ACCESS_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      res.status(500).json({ error: "Server configuration error." });
      return;
    }

    const decodedToken = jwt.verify(authToken, process.env.JWT_ACCESS_SECRET);
    req.encodedPayload = decodedToken;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({ error: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ error: "Invalid token" });
    } else {
      console.error("Token verification failed with unexpected error:", error);
      res.status(403).json({ error: "Token verification failed" });
    }
  }
};