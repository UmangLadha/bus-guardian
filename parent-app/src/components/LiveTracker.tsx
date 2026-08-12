import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  locationName: string;
  latitude: number;
  longitude: number;
}

interface LiveTrackerProps {
  locations: Location[];
  busPosition: { lat: number; lng: number } | null;
  isActive: boolean;
}

const stopIcon = new L.DivIcon({
  html: `<div style="
    width: 12px;
    height: 12px;
    background: #3B82F6;
    border: 3px solid #111827;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  "></div>`,
  className: "",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const busIcon = new L.DivIcon({
  html: `<div class="bus-marker-blinking" style="
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    position: relative;
  ">
    <div class="pulse-ring" style="
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(37, 99, 235, 0.3);
    "></div>
    🚌
  </div>`,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function LiveTracker({ locations, busPosition, isActive }: LiveTrackerProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="map-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card)" }}>
        <p style={{ color: "var(--text-secondary)" }}>No route data available</p>
      </div>
    );
  }

  const center: [number, number] = busPosition
    ? [busPosition.lat, busPosition.lng]
    : [locations[0].latitude, locations[0].longitude];

  const polylinePositions: [number, number][] = locations.map((loc) => [
    loc.latitude,
    loc.longitude,
  ]);

  return (
    <div className="glass-card fade-in" style={{ padding: 0, overflow: "hidden", animationDelay: "0.2s" }}>
      {/* Status bar */}
      <div style={{
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 700 }}>📍 Live Tracking</h3>
        {isActive ? (
          <span className="badge badge-success" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block" }}></span>
            Bus is on the move
          </span>
        ) : (
          <span className="badge badge-warning">Bus not active</span>
        )}
      </div>

      <div style={{ height: 350 }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <Polyline
            positions={polylinePositions}
            pathOptions={{
              color: "#3B82F6",
              weight: 4,
              opacity: 0.7,
              dashArray: "10, 6",
            }}
          />

          {locations.map((loc, index) => (
            <Marker key={index} position={[loc.latitude, loc.longitude]} icon={stopIcon}>
              <Popup>
                <div style={{ fontWeight: 600 }}>{loc.locationName}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>Stop {index + 1}</div>
              </Popup>
            </Marker>
          ))}

          {busPosition && isActive && (
            <Marker position={[busPosition.lat, busPosition.lng]} icon={busIcon}>
              <Popup>
                <div style={{ fontWeight: 600 }}>🚌 Bus Location</div>
                <div style={{ fontSize: 12 }}>Live tracking active</div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
