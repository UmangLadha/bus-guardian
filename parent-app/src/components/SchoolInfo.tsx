import { FiBook, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

interface SchoolInfoProps {
  schoolName: string;
  contactPhone: string;
  contactEmail?: string;
  address?: string;
}

export default function SchoolInfo({ schoolName, contactPhone, contactEmail, address }: SchoolInfoProps) {
  return (
    <div className="glass-card fade-in" style={{ animationDelay: "0.4s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent), var(--accent-light))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <FiBook size={18} color="white" />
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{schoolName}</h3>
          <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>School Information</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FiPhone size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
          <a
            href={`tel:${contactPhone}`}
            style={{ fontSize: 14, color: "var(--primary-light)", textDecoration: "none" }}
          >
            {contactPhone}
          </a>
        </div>

        {contactEmail && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FiMail size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
            <a
              href={`mailto:${contactEmail}`}
              style={{ fontSize: 14, color: "var(--primary-light)", textDecoration: "none" }}
            >
              {contactEmail}
            </a>
          </div>
        )}

        {address && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <FiMapPin size={14} style={{ color: "var(--text-secondary)", flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{address}</span>
          </div>
        )}
      </div>
    </div>
  );
}
