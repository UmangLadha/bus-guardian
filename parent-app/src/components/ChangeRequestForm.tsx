import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { FiMapPin, FiSend, FiMessageSquare } from "react-icons/fi";

interface Student {
  _id: string;
  studentId: string;
  studentName: string;
  checkpoint: string;
}

interface ChangeRequestFormProps {
  students: Student[];
  parentPhoneNo: string;
  onSuccess: () => void;
}

export default function ChangeRequestForm({ students, parentPhoneNo, onSuccess }: ChangeRequestFormProps) {
  const [selectedStudent, setSelectedStudent] = useState(students[0]?._id || "");
  const [requestedCheckpoint, setRequestedCheckpoint] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedStudent || !requestedCheckpoint) {
      toast.error("Please fill in the new pickup/drop-off location");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/location-request", {
        studentId: selectedStudent,
        parentPhoneNo,
        requestedCheckpoint,
        reason,
      });

      if (res.data.success) {
        toast.success("Request submitted! Awaiting school approval.");
        setRequestedCheckpoint("");
        setReason("");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
        <FiMapPin style={{ verticalAlign: "middle", marginRight: 8 }} />
        Request Location Change
      </h3>
      <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 20 }}>
        Submit a request to change your child's pickup/drop-off location. Requires school approval.
      </p>

      {students.length > 1 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
            Select Student
          </label>
          <select
            className="input-field"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            style={{ cursor: "pointer" }}
          >
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.studentName} (Current: {s.checkpoint || "Not set"})
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
          <FiMapPin size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
          New Pickup/Drop-off Location
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter new location name"
          value={requestedCheckpoint}
          onChange={(e) => setRequestedCheckpoint(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
          <FiMessageSquare size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
          Reason (optional)
        </label>
        <textarea
          className="textarea-field"
          placeholder="Why do you need to change the location?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading || !requestedCheckpoint}
      >
        <FiSend size={16} />
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
}
