import { useState, useEffect, useRef, useCallback } from "react";
import api from "../utils/api";

interface Alert {
  _id: string;
  type: "departed" | "arrived" | "nearby";
  busNumber: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function useAlerts(phoneNo: string | null) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAlerts = useCallback(async () => {
    if (!phoneNo) return;
    try {
      setLoading(true);
      const res = await api.get(`/alert/parent/${phoneNo}?recent=true`);
      if (res.data.success) {
        setAlerts(res.data.alerts);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  }, [phoneNo]);

  useEffect(() => {
    fetchAlerts();

    // Poll every 15 seconds
    intervalRef.current = setInterval(fetchAlerts, 15000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchAlerts]);

  return { alerts, loading, refetch: fetchAlerts };
}
