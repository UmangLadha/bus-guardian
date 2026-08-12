import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default class tokenServices {
  static createJwtToken(id: Types.ObjectId) {
    const accessToken = jwt.sign(
      { id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '7d' }
    );
    return accessToken;
  }
}
