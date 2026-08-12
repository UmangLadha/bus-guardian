import { useState, useEffect, useRef, useCallback } from "react";
import api from "../utils/api";

interface LiveLocation {
  lat: number;
  lng: number;
  updatedAt: string;
}

interface TripData {
  _id: string;
  status: string;
  liveLocation: LiveLocation | null;
}

export function useLiveTracking(busId: string | null) {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchTrip = useCallback(async () => {
    if (!busId) return;
    try {
      setLoading(true);
      const res = await api.get(`/trip/active/${busId}`);
      if (res.data.success) {
        setTripData(res.data.trip);
        setIsActive(true);
      }
    } catch {
      setTripData(null);
      setIsActive(false);
    } finally {
      setLoading(false);
    }
  }, [busId]);

  useEffect(() => {
    fetchTrip();

    // Poll every 5 seconds
    intervalRef.current = setInterval(fetchTrip, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchTrip]);

  return { tripData, isActive, loading, refetch: fetchTrip };
}
