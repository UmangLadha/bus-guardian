import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import ChangeRequestForm from "../components/ChangeRequestForm";
import { FiArrowLeft, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface Student {
  _id: string;
  studentId: string;
  studentName: string;
  checkpoint: string;
}

interface ChangeRequest {
  _id: string;
  studentId: { studentName: string; studentId: string; checkpoint: string } | null;
  currentCheckpoint: string;
  requestedCheckpoint: string;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  respondedAt?: string;
}

export default function ChangeRequestPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const parentPhone = localStorage.getItem("parent_phone");

  const fetchData = useCallback(async () => {
    if (!parentPhone) {
      navigate("/login");
      return;
    }
    try {
      const [dashRes, reqRes] = await Promise.all([
        api.get(`/student/parent/${parentPhone}/dashboard`),
        api.get(`/location-request/parent/${parentPhone}`),
      ]);

      if (dashRes.data.success) {
        setStudents(dashRes.data.dashboard.students);
      }
      if (reqRes.data.success) {
        setRequests(reqRes.data.requests);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [parentPhone, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const statusConfig = {
    pending: {
      icon: <FiClock size={14} />,
      badge: "badge-accent",
      label: "Pending",
      cardClass: "status-pending",
    },
    approved: {
      icon: <FiCheckCircle size={14} />,
      badge: "badge-success",
      label: "Approved",
      cardClass: "status-approved",
    },
    rejected: {
      icon: <FiXCircle size={14} />,
      badge: "badge-danger",
      label: "Rejected",
      cardClass: "status-rejected",
    },
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #0d1b3e 0%, #0A0E1A 60%)",
      padding: "20px 16px",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Link
            to="/dashboard"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-primary)",
              textDecoration: "none",
            }}
          >
            <FiArrowLeft size={16} />
          </Link>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800 }}>Location Change</h1>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Request a new pickup/drop-off location</p>
          </div>
        </div>

        {/* Form */}
        {students.length > 0 && parentPhone && (
          <div style={{ marginBottom: 24 }}>
            <ChangeRequestForm
              students={students}
              parentPhoneNo={parentPhone}
              onSuccess={fetchData}
            />
          </div>
        )}

        {/* Previous Requests */}
        <div className="glass-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            Previous Requests
          </h3>

          {requests.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", padding: "20px 0" }}>
              No previous requests
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {requests.map((req) => {
                const config = statusConfig[req.status];
                return (
                  <div
                    key={req._id}
                    className={config.cardClass}
                    style={{
                      background: "rgba(10, 14, 26, 0.4)",
                      borderRadius: 12,
                      padding: 16,
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {req.studentId?.studentName || "Student"}
                      </span>
                      <span className={`badge ${config.badge}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {config.icon}
                        {config.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 4 }}>
                      <div>
                        <strong>From:</strong> {req.currentCheckpoint}
                      </div>
                      <div>
                        <strong>To:</strong> {req.requestedCheckpoint}
                      </div>
                      {req.reason && (
                        <div style={{ fontStyle: "italic", marginTop: 4 }}>
                          "{req.reason}"
                        </div>
                      )}
                      <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>
                        Submitted: {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
