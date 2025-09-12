import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default class tokenServices {
  static createJwtToken(id: Types.ObjectId ) {
    console.log("hers is the id", id);
    const accessToken = jwt.sign(
      { id: id.toString() },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '7d' }
    );
    return accessToken;
  }
}
