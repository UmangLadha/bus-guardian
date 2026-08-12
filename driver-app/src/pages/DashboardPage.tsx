import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import RouteMap from "../components/RouteMap";
import StopCard from "../components/StopCard";
import TripControls from "../components/TripControls";
import { useGeolocation } from "../hooks/useGeolocation";
import { FiLogOut, FiTruck, FiMap, FiUser } from "react-icons/fi";
import { io, Socket } from "socket.io-client";

import { DashboardData } from "../types";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tripLoading, setTripLoading] = useState(false);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    latitude,
    longitude,
    error: geoError,
    isTracking,
    startTracking,
    stopTracking,
  } = useGeolocation();
  const socketRef = useRef<Socket | null>(null);
  const locationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const driverId = localStorage.getItem("driver_id");
  const driverName = localStorage.getItem("driver_name");

  const fetchDashboard = useCallback(async () => {
    if (!driverId) {
      navigate("/login");
      return;
    }
    try {
      const res = await api.get(`/driver/${driverId}/dashboard`);
      if (res.data.success) {
        setDashboard(res.data.dashboard);
        if (res.data.dashboard.activeTrip) {
          setActiveTripId(res.data.dashboard.activeTrip._id);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [driverId, navigate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Initialize Socket.io connection
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const socketUrl = apiUrl.replace("/api", "");
    socketRef.current = io(socketUrl);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Join bus room when dashboard loads
  useEffect(() => {
    if (dashboard?.bus?._id && socketRef.current) {
      socketRef.current.emit("join-bus-room", dashboard.bus._id);
    }
  }, [dashboard?.bus?._id]);

  // Send location updates when tracking — via both Socket.io and REST API
  useEffect(() => {
    if (isTracking && activeTripId && latitude && longitude) {
      const busId = dashboard?.bus?._id;

      // Send immediately via REST (persists to DB) and Socket.io (real-time)
      api
        .patch(`/trip/${activeTripId}/location`, {
          lat: latitude,
          lng: longitude,
        })
        .catch(console.error);
      if (busId && socketRef.current) {
        socketRef.current.emit("driver-location-update", {
          busId,
          lat: latitude,
          lng: longitude,
        });
      }

      // Then every 5 seconds
      locationIntervalRef.current = setInterval(() => {
        if (latitude && longitude) {
          api
            .patch(`/trip/${activeTripId}/location`, {
              lat: latitude,
              lng: longitude,
            })
            .catch(console.error);
          if (busId && socketRef.current) {
            socketRef.current.emit("driver-location-update", {
              busId,
              lat: latitude,
              lng: longitude,
            });
          }
        }
      }, 5000);
    }

    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
        locationIntervalRef.current = null;
      }
    };
  }, [isTracking, activeTripId, latitude, longitude, dashboard?.bus?._id]);

  const handleStartTrip = async () => {
    if (!dashboard?.bus || !dashboard?.route) {
      toast.error("No bus or route assigned");
      return;
    }

    setTripLoading(true);
    startTracking();

    try {
      const res = await api.post("/trip/start", {
        driverId,
        busId: dashboard.bus._id,
        routeId: dashboard.route._id,
      });
      if (res.data.success) {
        setActiveTripId(res.data.trip._id);
        toast.success("Trip started! Location sharing is active.");
        fetchDashboard();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to start trip");
      stopTracking();
    } finally {
      setTripLoading(false);
    }
  };

  const handleEndTrip = async () => {
    if (!activeTripId) return;
    setTripLoading(true);

    try {
      const res = await api.patch(`/trip/${activeTripId}/complete`);
      if (res.data.success) {
        stopTracking();
        setActiveTripId(null);
        toast.success("Trip completed!");
        fetchDashboard();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to end trip");
    } finally {
      setTripLoading(false);
    }
  };

  const handleLogout = () => {
    stopTracking();
    socketRef.current?.disconnect();
    localStorage.removeItem("driver_token");
    localStorage.removeItem("driver_id");
    localStorage.removeItem("driver_name");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  const totalStudents =
    dashboard?.studentsPerStop.reduce((sum, s) => sum + s.count, 0) || 0;

  return (
    <div
      className="min-h-screen py-5 px-4"
      style={{
        background: "radial-gradient(ellipse at top, #1a1040 0%, #0F0F1A 60%)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center max-w-[800px] mx-auto mb-6">
        <div>
          <h1 className="text-2xl font-bold">🚌 Bus Guardian</h1>
          <p className="text-md m-0 p-0 text-text-secondary">
            <FiUser className="inline-block align-middle mr-1" size={12} />
            {driverName || dashboard?.driver?.driverName}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-danger/10 border border-danger/30 rounded-[10px] py-2 px-3.5 text-danger cursor-pointer flex items-center gap-1.5 text-[13px] font-semibold"
        >
          <FiLogOut size={14} /> Logout
        </button>
      </div>

      <div className="max-w-[800px] mx-auto flex flex-col gap-5">
        {/* Bus & Route Info Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <div className="glass-card fade-in">
            <div className="flex items-center gap-2.5 mb-3">
              <FiTruck size={20} className="text-primary-light" />
              <span className="text-[13px] text-text-secondary font-semibold">
                Assigned Bus
              </span>
            </div>
            <div className="text-[28px] font-bold">
              {dashboard?.bus?.busNumber || "Not Assigned"}
            </div>
            {dashboard?.bus && (
              <div className="text-xs text-text-secondary mt-1">
                Capacity: {dashboard.bus.busCapacity} seats
              </div>
            )}
          </div>

          <div
            className="glass-card fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <FiMap size={20} className="text-accent" />
              <span className="text-[13px] text-text-secondary font-semibold">
                Route
              </span>
            </div>
            <div className="text-[20px] font-bold">
              {dashboard?.route?.routeName || "Not Assigned"}
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {dashboard?.route?.locationsList?.length || 0} stops ·{" "}
              {totalStudents} students
            </div>
          </div>
        </div>

        {/* Trip Controls */}
        <TripControls
          isTripActive={!!activeTripId}
          isLoading={tripLoading}
          onStartTrip={handleStartTrip}
          onEndTrip={handleEndTrip}
          locationError={geoError}
        />

        {/* Route Map */}
        {dashboard?.route && (
          <div className="fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-bold mb-3">
              <FiMap className="inline-block align-middle mr-2" />
              Route Map
            </h2>
            <RouteMap
              locations={dashboard.route.locationsList}
              busPosition={
                latitude && longitude ? { lat: latitude, lng: longitude } : null
              }
              isTripActive={!!activeTripId}
            />
          </div>
        )}

        {/* Stops with Student Counts */}
        {dashboard?.studentsPerStop && dashboard.studentsPerStop.length > 0 && (
          <div className="fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-lg font-bold mb-3">Students per Stop</h2>
            <div className="flex flex-col gap-2.5">
              {dashboard.studentsPerStop.map((stop, idx) => (
                <StopCard
                  key={stop.stopName}
                  stopName={stop.stopName}
                  studentCount={stop.count}
                  index={idx}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
