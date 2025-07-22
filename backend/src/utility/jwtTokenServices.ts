import jwt from "jsonwebtoken";
import { AdminUser } from "../types/types";

export default class tokenServices {
  static createJwtToken(user: AdminUser) {
    const accessToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "7d" }
    );
    return accessToken;
  }
}
