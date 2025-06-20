import jwt from "jsonwebtoken";
import { AdminUser } from "../types/types";

  export function createJwtToken(user:AdminUser) {
    const accessToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "1h" }
    );
    return accessToken;
  }