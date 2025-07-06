import Admin from "../models/admin.model";
import { PasswordUtils } from "../utility/hashPassword";
import tokenServices from "../utility/jwtTokenServices";

export class  AdminServices {
  static async registerAdmin(
    email: string,
    phoneNo: number,
    password: string
  ) {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return { success: false, message: "Email already exists" };
    }
    const hashedPassword = await PasswordUtils.hashPassword(password);
    const newAdmin = await Admin.create({
      email,
      phoneNo,
      password: hashedPassword,
    });
    const accessToken = tokenServices.createJwtToken(newAdmin);
    return { success: true, newAdmin, accessToken};
  }

  static async adminLogin(email: string, password: string, token:string) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return { success: false, message: "Invalid email" };
    }
    const checkPassword = await PasswordUtils.validatePassword(
      password,
      admin.password
    );
    if (!checkPassword) {
      return { success: false, message: "Incorrect Password!" };
    }
    const accessToken = tokenServices.createJwtToken(admin);
    return { success: true, accessToken};
  }

  static async findAdmin(id:string) {
    const admin = await Admin.findById({_id:id});
    return { success: true, admin };
  }

  static async deleteAdminById(id: string) {
    await Admin.findByIdAndDelete(id);
    return { success: true };
  }
}
