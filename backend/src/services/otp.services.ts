import OTP from "../models/otp.model";
import Driver from "../models/driver.model";
import Student from "../models/student.model";
import tokenServices from "../utility/jwtTokenServices";
import { SmsService } from "../utility/smsService";

export class OtpServices {
  static async sendOtp(phoneNo: string) {
    // Check if phone exists in either Driver or Student (parentPhoneNo)
    const driver = await Driver.findOne({ driverPhoneNo: phoneNo });
    console.log(driver);
    const student = await Student.findOne({ parentPhoneNo: phoneNo });

    if (!driver && !student) {
      return {
        success: false,
        message: "Phone number not registered in school management system",
      };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove any existing OTPs for this phone
    await OTP.deleteMany({ phoneNo });

    // Store OTP with 5-minute expiry
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await OTP.create({ phoneNo, otp, expiresAt });

    // Send OTP via SMS
    await SmsService.sendOtp(phoneNo, otp);

    const role = driver ? "driver" : "parent";

    return {
      success: true,
      message: "OTP sent successfully to your phone",
      role,
    };
  }

  static async verifyOtp(phoneNo: string, otp: string) {
    const otpRecord = await OTP.findOne({ phoneNo, otp });

    if (!otpRecord) {
      return { success: false, message: "Invalid OTP" };
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return { success: false, message: "OTP has expired" };
    }

    // Determine role and get user ID
    const driver = await Driver.findOne({ driverPhoneNo: Number(phoneNo) });
    const student = await Student.findOne({ parentPhoneNo: Number(phoneNo) });

    if (!driver && !student) {
      return {
        success: false,
        message: "Phone number not registered in school management system",
      };
    }

    const role = driver ? "driver" : "parent";
    const userId = driver ? driver._id : student!._id;
    const accessToken = tokenServices.createJwtToken(userId);

    // Clean up used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    return {
      success: true,
      message: "OTP verified successfully",
      accessToken,
      role,
      userId,
      // Return additional info based on role
      ...(driver && { driverId: driver._id, driverName: driver.driverName }),
      ...(student && {
        studentId: student._id,
        studentName: student.studentName,
        parentPhoneNo: student.parentPhoneNo,
      }),
    };
  }
}
