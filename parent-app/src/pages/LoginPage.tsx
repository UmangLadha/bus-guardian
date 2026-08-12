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
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phoneNo || phoneNo.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/otp/send", { phoneNo });
      if (res.data.success) {
        toast.success("OTP sent to your phone!");
        if (res.data.role !== "parent") {
          toast.error("This app is for parents only. Please use the driver app.");
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
        if (res.data.role !== "parent") {
          toast.error("This app is for parents only.");
          setLoading(false);
          return;
        }
        localStorage.setItem("parent_token", res.data.accessToken);
        localStorage.setItem("parent_phone", phoneNo);
        localStorage.setItem("parent_student_name", res.data.studentName || "");
        toast.success("Welcome!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      background: "radial-gradient(ellipse at top, #0d1b3e 0%, #0A0E1A 60%)",
    }}>
      <div className="glass-card fade-in" style={{ maxWidth: 420, width: "100%" }}>
        {/* Logo / Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 32,
          }}>
            👨‍👩‍👧
          </div>
          <h1 className="gradient-text" style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
            Bus Guardian
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Parent Portal — Track your child's bus
          </p>
        </div>

        {step === "phone" ? (
          <div className="fade-in">
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              <FiSmartphone style={{ verticalAlign: "middle", marginRight: 6 }} />
              Enter your registered mobile number
            </label>
            <input
              type="tel"
              className="input-field"
              placeholder="Enter phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value.replace(/\D/g, ""))}
              maxLength={15}
              style={{ marginBottom: 8 }}
            />
            <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 20 }}>
              Your number must be registered in the school management system
            </p>
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
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12, textAlign: "center" }}>
              <FiShield style={{ verticalAlign: "middle", marginRight: 6 }} />
              Enter the 6-digit OTP sent to {phoneNo}
            </label>

            <div style={{ marginBottom: 24 }}>
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
              onClick={() => { setStep("phone"); setOtp(""); }}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                marginTop: 16,
                fontSize: 13,
                width: "100%",
                textAlign: "center",
              }}
            >
              ← Change phone number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
