import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  phoneNo: { type: Number, required: true, unique: true },
  otp: { type: Number, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
}, { timestamps: true });

// Ensure only one active OTP per phone number
otpSchema.index({ phoneNo: 1 });

const OTP = model("OTP", otpSchema);

export default OTP;
