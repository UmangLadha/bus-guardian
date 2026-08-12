import { FiUser, FiPhone } from "react-icons/fi";

interface DriverInfoProps {
  driverName: string;
  driverPhoneNo: string;
}

export default function DriverInfo({ driverName, driverPhoneNo }: DriverInfoProps) {
  return (
    <div className="glass-card fade-in">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <FiUser size={20} color="white" />
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Driver Details</h3>
          <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Your child's bus driver</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Name</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{driverName}</span>
        </div>
        <div style={{
          height: 1,
          background: "var(--border)",
        }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Phone</span>
          <a
            href={`tel:${driverPhoneNo}`}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--primary-light)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <FiPhone size={13} />
            {driverPhoneNo}
          </a>
        </div>
      </div>
    </div>
  );
}
