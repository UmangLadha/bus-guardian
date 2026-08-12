export interface DashboardData {
  driver: { _id: string; driverName: string; driverPhoneNo: string };
  bus: { _id: string; busNumber: string; busCapacity: number } | null;
  route: {
    _id: string;
    routeName: string;
    locationsList: { locationName: string; latitude: number; longitude: number }[];
  } | null;
  studentsPerStop: { stopName: string; count: number; students: any[] }[];
  activeTrip: { _id: string; status: string; startedAt: string; liveLocation: any } | null;
}

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isTracking: boolean;
}

export interface TripControlsProps {
  isTripActive: boolean;
  isLoading: boolean;
  onStartTrip: () => void;
  onEndTrip: () => void;
  locationError?: string | null;
}

export interface StopCardProps {
  stopName: string;
  studentCount: number;
  index: number;
}

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export interface Location {
  locationName: string;
  latitude: number;
  longitude: number;
}

export interface RouteMapProps {
  locations: Location[];
  busPosition?: { lat: number; lng: number } | null;
  isTripActive?: boolean;
}
