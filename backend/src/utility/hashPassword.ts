import bcrypt from "bcrypt";

export class PasswordUtils {
  static hashPassword(password: string) {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static validatePassword(currentPassword: string, hashedPassword: string) {
    const checkPassword = bcrypt.compare(currentPassword, hashedPassword);
    return checkPassword;
  }
}
