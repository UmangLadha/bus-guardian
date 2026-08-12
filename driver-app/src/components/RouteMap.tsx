import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Location, RouteMapProps } from "../types";

// Custom stop marker icon
const stopIcon = new L.DivIcon({
  html: `<div class="w-3.5 h-3.5 bg-accent border-[3px] border-bg-card rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>`,
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// Blinking bus icon
const busIcon = new L.DivIcon({
  html: `<div class="bus-marker-blinking w-9 h-9 flex items-center justify-center text-2xl relative">
    <div class="pulse-ring absolute w-9 h-9 rounded-full bg-[rgba(108,60,225,0.3)]"></div>
    🚌
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

export default function RouteMap({ locations, busPosition, isTripActive }: RouteMapProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="map-container flex items-center justify-center bg-bg-card">
        <p className="text-text-secondary">No route data available</p>
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
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Route polyline */}
        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: "#8B5CF6",
            weight: 4,
            opacity: 0.8,
            dashArray: "10, 6",
          }}
        />

        {/* Stop markers */}
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.latitude, loc.longitude]}
            icon={stopIcon}
          >
            <Popup>
              <div className="font-semibold">{loc.locationName}</div>
              <div className="text-xs opacity-70">Stop {index + 1}</div>
            </Popup>
          </Marker>
        ))}

        {/* Bus position marker */}
        {busPosition && isTripActive && (
          <Marker
            position={[busPosition.lat, busPosition.lng]}
            icon={busIcon}
          >
            <Popup>
              <div className="font-semibold">🚌 Bus Location</div>
              <div className="text-xs">Live tracking active</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
