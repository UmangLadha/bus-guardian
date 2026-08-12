import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import DriverInfo from "../components/DriverInfo";
import BusRouteInfo from "../components/BusRouteInfo";
import LiveTracker from "../components/LiveTracker";
import AlertsBanner from "../components/AlertsBanner";
import SchoolInfo from "../components/SchoolInfo";
import { FiLogOut, FiMapPin, FiUser } from "react-icons/fi";
import { io } from "socket.io-client";

interface DashboardData {
  students: {
    _id: string;
    studentId: string;
    studentName: string;
    checkpoint: string;
    assignedBus: { _id: string; busNumber: string };
  }[];
  bus: { _id: string; busNumber: string; busCapacity: number } | null;
  driver: { _id: string; driverName: string; driverPhoneNo: string } | null;
  route: {
    _id: string;
    routeName: string;
    locationsList: { locationName: string; latitude: number; longitude: number }[];
  } | null;
  school: {
    schoolName: string;
    contactPhone: string;
    contactEmail?: string;
    address?: string;
  } | null;
}

interface Alert {
  _id: string;
  type: "departed" | "arrived" | "nearby";
  busNumber: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface LiveLocation {
  lat: number;
  lng: number;
}

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [busPosition, setBusPosition] = useState<LiveLocation | null>(null);
  const [isTripActive, setIsTripActive] = useState(false);
  const navigate = useNavigate();

  const parentPhone = localStorage.getItem("parent_phone");

  const fetchDashboard = useCallback(async () => {
    if (!parentPhone) {
      navigate("/login");
      return;
    }
    try {
      const res = await api.get(`/student/parent/${parentPhone}/dashboard`);
      if (res.data.success) {
        setDashboard(res.data.dashboard);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [parentPhone, navigate]);

  // Fetch initial alerts
  const fetchAlerts = useCallback(async () => {
    if (!parentPhone) return;
    try {
      const res = await api.get(`/alert/parent/${parentPhone}?recent=true`);
      if (res.data.success) {
        setAlerts(res.data.alerts);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  }, [parentPhone]);

  useEffect(() => {
    fetchDashboard();
    fetchAlerts();
  }, [fetchDashboard, fetchAlerts]);

  // Socket.io for real-time updates
  useEffect(() => {
    if (!dashboard?.bus?._id || !parentPhone) return;

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const socketUrl = apiUrl.replace("/api", "");
    const socket = io(socketUrl);

    // Join the bus room for live location updates
    socket.emit("join-bus-room", dashboard.bus._id);
    // Join the parent room for alerts
    socket.emit("join-parent-room", parentPhone);

    socket.on("location-update", (data: { lat: number; lng: number }) => {
      setBusPosition(data);
      setIsTripActive(true);
    });

    socket.on("trip-started", () => {
      setIsTripActive(true);
      toast.success("🚌 Bus has started its trip!");
    });

    socket.on("trip-ended", () => {
      setIsTripActive(false);
      setBusPosition(null);
    });

    socket.on("new-alert", (alert: Alert) => {
      setAlerts((prev) => [alert, ...prev]);
      // Show toast notification
      if (alert.type === "departed") {
        toast("🚌 " + alert.message, { icon: "🏫" });
      } else if (alert.type === "arrived") {
        toast.success("✅ " + alert.message);
      } else if (alert.type === "nearby") {
        toast("📍 " + alert.message, { icon: "⚠️" });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dashboard?.bus?._id, parentPhone]);

  const handleLogout = () => {
    localStorage.removeItem("parent_token");
    localStorage.removeItem("parent_phone");
    localStorage.removeItem("parent_student_name");
    navigate("/login");
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
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 800,
        margin: "0 auto 24px",
      }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: 24, fontWeight: 800 }}>
            🚌 Bus Guardian
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            <FiUser style={{ verticalAlign: "middle", marginRight: 4 }} size={12} />
            {dashboard?.students?.[0]?.studentName
              ? `Parent of ${dashboard.students.map((s) => s.studentName).join(", ")}`
              : "Parent Portal"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: 10,
            padding: "8px 14px",
            color: "#EF4444",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <FiLogOut size={14} /> Logout
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Alerts Banner */}
        <AlertsBanner alerts={alerts} />

        {/* Live Tracking Map */}
        {dashboard?.route && (
          <LiveTracker
            locations={dashboard.route.locationsList}
            busPosition={busPosition}
            isActive={isTripActive}
          />
        )}

        {/* Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {/* Driver Info */}
          {dashboard?.driver && (
            <DriverInfo
              driverName={dashboard.driver.driverName}
              driverPhoneNo={dashboard.driver.driverPhoneNo}
            />
          )}

          {/* Bus Route Info */}
          {dashboard?.route && dashboard?.bus && (
            <BusRouteInfo
              routeName={dashboard.route.routeName}
              locations={dashboard.route.locationsList}
              busNumber={dashboard.bus.busNumber}
            />
          )}
        </div>

        {/* School Info */}
        {dashboard?.school && (
          <SchoolInfo
            schoolName={dashboard.school.schoolName}
            contactPhone={dashboard.school.contactPhone}
            contactEmail={dashboard.school.contactEmail}
            address={dashboard.school.address}
          />
        )}

        {/* Change Request Link */}
        <Link
          to="/change-request"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 24px",
            background: "transparent",
            border: "1px solid var(--primary-light)",
            borderRadius: 12,
            color: "var(--primary-light)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 15,
            transition: "all 0.3s ease",
          }}
        >
          <FiMapPin size={16} />
          Request Pickup/Drop-off Location Change
        </Link>
      </div>
    </div>
  );
}
