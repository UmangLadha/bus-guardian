import { FiMapPin } from "react-icons/fi";

interface Location {
  locationName: string;
  latitude: number;
  longitude: number;
}

interface BusRouteInfoProps {
  routeName: string;
  locations: Location[];
  busNumber: string;
}

export default function BusRouteInfo({ routeName, locations, busNumber }: BusRouteInfoProps) {
  return (
    <div className="glass-card fade-in" style={{ animationDelay: "0.1s" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Bus Route</h3>
          <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Bus {busNumber} · {routeName}</p>
        </div>
        <span className="badge badge-primary">{locations.length} stops</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {locations.map((loc, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            {/* Connector line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 20 }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: idx === 0 ? "var(--success)" : idx === locations.length - 1 ? "var(--danger)" : "var(--primary-light)",
                border: "2px solid var(--bg-dark)",
                flexShrink: 0,
              }} />
              {idx < locations.length - 1 && (
                <div style={{
                  width: 2,
                  height: 28,
                  background: "var(--border)",
                }} />
              )}
            </div>
            <div style={{ paddingBottom: idx < locations.length - 1 ? 16 : 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                <FiMapPin size={12} style={{ verticalAlign: "middle", marginRight: 4, color: "var(--text-secondary)" }} />
                {loc.locationName}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                {idx === 0 ? "Start" : idx === locations.length - 1 ? "End" : `Stop ${idx}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
