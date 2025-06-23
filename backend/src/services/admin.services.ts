import Admin from "../models/admin.model";
import { PasswordUtils } from "../utility/hashPassword";
import { createJwtToken } from "../utility/createJwtToken";

export class AdminServices {
  static async registerAdmin(
    username: string,
    phoneNo: number,
    password: string
  ) {
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }
    const hashedPassword = await PasswordUtils.hashPassword(password);
    const newUser = await Admin.create({
      username,
      phoneNo,
      password: hashedPassword,
    });
    return { success: true, newUser };
  }

  static async adminLogin(username: string, password: string) {
    const user = await Admin.findOne({ username });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const checkPassword = await PasswordUtils.validatePassword(
      password,
      user.password
    );
    if (!checkPassword) {
      return { success: false, message: "Incorrect Password!" };
    }
    const accessToken = createJwtToken(user);
    return { success: true, accessToken };
  }
  static async findAllAdmin() {
    const admins = await Admin.find();
    return { success: true, admins };
  }

  static async deleteAdminById(id: string) {
    await Admin.findByIdAndDelete(id);
    return { success: true };
  }
}
