import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import OtpInput from "../components/OtpInput";
import api from "../utils/api";
import { FiSmartphone, FiShield, FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [devOtp, setDevOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phoneNo || phoneNo.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/otp/send", { phoneNo });
      console.log("Otp sent", res);
      if (res.data.success) {
        toast.success(res.data.message);
        if (res.data.devOtp) {
          setDevOtp(res.data.devOtp);
        }
        if (res.data.role !== "driver") {
          toast.error(
            "This app is for drivers only. Please use the parent app.",
          );
          setLoading(false);
          return;
        }
        setStep("otp");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/otp/verify", { phoneNo, otp });
      if (res.data.success) {
        if (res.data.role !== "driver") {
          toast.error("This app is for drivers only.");
          setLoading(false);
          return;
        }
        localStorage.setItem("driver_token", res.data.accessToken);
        localStorage.setItem("driver_id", res.data.driverId);
        localStorage.setItem("driver_name", res.data.driverName);
        toast.success(`Welcome, ${res.data.driverName}!`);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5"
      style={{
        background: "radial-gradient(ellipse at top, #1a1040 0%, #0F0F1A 60%)",
      }}
    >
      <div className="glass-card fade-in max-w-[420px] w-full">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-4 text-[32px]">
            🚌
          </div>
          <h1 className="gradient-text text-[28px] font-bold mb-1">
            Bus Guardian
          </h1>
          <p className="text-text-secondary text-sm">Driver Portal</p>
        </div>

        {step === "phone" ? (
          <div className="fade-in">
            <label className="block text-[13px] font-semibold text-text-secondary mb-2">
              <FiSmartphone className="inline-block align-middle mr-1.5" />
              Enter your registered mobile number
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              className="input-field mb-5"
            />
            <button
              className="btn-primary"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
              <FiArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="fade-in">
            <label className="block text-[13px] font-semibold text-text-secondary mb-2 text-center">
              <FiShield className="inline-block align-middle mr-1.5" />
              Enter the 6-digit OTP sent to {phoneNo}
            </label>

            {devOtp && (
              <div className="bg-accent/10 border border-accent/30 rounded-[10px] py-2 px-3.5 mb-4 text-center text-[13px] text-accent">
                Dev OTP: <strong>{devOtp}</strong>
              </div>
            )}

            <div className="mb-6">
              <OtpInput value={otp} onChange={setOtp} />
            </div>

            <button
              className="btn-primary"
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify & Login"}
              <FiShield size={18} />
            </button>

            <button
              onClick={() => {
                setStep("phone");
                setOtp("");
                setDevOtp("");
              }}
              className="bg-transparent border-none text-text-secondary cursor-pointer mt-4 text-[13px] w-full text-center"
            >
              ← Change phone number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
