import { FiBell, FiNavigation, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

interface Alert {
  _id: string;
  type: "departed" | "arrived" | "nearby";
  message: string;
  createdAt: string;
}

interface AlertsBannerProps {
  alerts: Alert[];
}

const alertConfig = {
  departed: { icon: <FiNavigation size={16} />, className: "alert-departed", color: "#3B82F6" },
  arrived: { icon: <FiCheckCircle size={16} />, className: "alert-arrived", color: "#10B981" },
  nearby: { icon: <FiAlertTriangle size={16} />, className: "alert-nearby", color: "#F59E0B" },
};

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}

export default function AlertsBanner({ alerts }: AlertsBannerProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="glass-card fade-in" style={{ animationDelay: "0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <FiBell size={18} style={{ color: "var(--primary-light)" }} />
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Alerts</h3>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", padding: "16px 0" }}>
          No recent alerts. You'll be notified when the bus departs, arrives, or is nearby.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card fade-in" style={{ animationDelay: "0.3s" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FiBell size={18} style={{ color: "var(--primary-light)" }} />
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Alerts</h3>
        </div>
        <span className="badge badge-primary">{alerts.length}</span>
      </div>

      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {alerts.slice(0, 10).map((alert, idx) => {
          const config = alertConfig[alert.type];
          return (
            <div
              key={alert._id}
              className={`alert-item ${config.className}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div style={{ color: config.color, flexShrink: 0 }}>
                {config.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{alert.message}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                  {timeAgo(alert.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
