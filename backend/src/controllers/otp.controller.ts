import { Request, Response } from "express";
import { OtpServices } from "../services/otp.services";

export class OtpController {
  static async sendOtp(req: Request, res: Response) {
    try {
      const { phoneNo } = req.body;
      if (!phoneNo) {
        res.status(400).json({ message: "Phone number is required" });
        return;
      }

      const result = await OtpServices.sendOtp(phoneNo);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send OTP" });
      return;
    }
  }

  static async verifyOtp(req: Request, res: Response) {
    try {
      const { phoneNo, otp } = req.body;
      if (!phoneNo || !otp) {
        res.status(400).json({ message: "Phone number and OTP are required" });
        return;
      }

      const result = await OtpServices.verifyOtp(phoneNo, otp);
      if (!result.success) {
        res.status(400).json({ message: result.message });
        return;
      }

      res.status(200).json(result);
      return;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Failed to verify OTP" });
      return;
    }
  }
}
