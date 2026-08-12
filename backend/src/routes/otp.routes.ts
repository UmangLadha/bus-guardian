import { Router } from "express";
import { OtpController } from "../controllers/otp.controller";

const otpRoutes = Router();

otpRoutes.post("/send", OtpController.sendOtp);
otpRoutes.post("/verify", OtpController.verifyOtp);

export default otpRoutes;
