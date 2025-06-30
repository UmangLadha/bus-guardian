import Admin from "../models/admin.model";
import { PasswordUtils } from "../utility/hashPassword";
import { createJwtToken } from "../utility/createJwtToken";

export class AdminServices {
  static async registerAdmin(
    adminId: string,
    phoneNo: number,
    password: string
  ) {
    const existingAdmin = await Admin.findOne({ adminId });
    if (existingAdmin) {
      return { success: false, message: "adminId already exists" };
    }
    const hashedPassword = await PasswordUtils.hashPassword(password);
    const newAdmin = await Admin.create({
      adminId,
      phoneNo,
      password: hashedPassword,
    });
    const accessToken = createJwtToken(newAdmin);
    return { success: true, newAdmin, accessToken};
  }

  static async adminLogin(adminId: string, password: string) {
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return { success: false, message: "admin not found" };
    }
    const checkPassword = await PasswordUtils.validatePassword(
      password,
      admin.password
    );
    if (!checkPassword) {
      return { success: false, message: "Incorrect Password!" };
    }
    const accessToken = createJwtToken(admin);
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
