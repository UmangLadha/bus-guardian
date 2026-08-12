import axios from "axios";

/**
 * SMS Service using Fast2SMS (free tier for Indian numbers).
 * Sign up at https://www.fast2sms.com/ to get your API key.
 * Set FAST2SMS_API_KEY in your .env file.
 */
export class SmsService {
  private static readonly API_URL = "https://www.fast2sms.com/dev/bulkV2";

  static async sendOtp(phoneNo: string, otp: string): Promise<boolean> {
    const apiKey = process.env.FAST2SMS_API_KEY;

    if (!apiKey) {
      console.warn("FAST2SMS_API_KEY not set. Falling back to console OTP.");
      console.log(`\n========================================`);
      console.log(`  OTP for ${phoneNo}: ${otp}`);
      console.log(`========================================\n`);
      return true;
    }

    try {
      const response = await axios.post(
        SmsService.API_URL,
        {
          route: "otp",
          variables_values: otp,
          numbers: phoneNo,
        },
        {
          headers: {
            authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.return === true) {
        console.log(`SMS sent successfully to ${phoneNo}`);
        return true;
      } else {
        console.error("SMS send failed:", response.data);
        return false;
      }
    } catch (error: any) {
      console.error("SMS sending error:", error.response?.data || error.message);
      // Fallback: log to console so the app doesn't break
      console.log(`\n[SMS FALLBACK] OTP for ${phoneNo}: ${otp}\n`);
      return false;
    }
  }
}
