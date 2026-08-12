import { FiMapPin, FiUsers } from "react-icons/fi";

import { StopCardProps } from "../types";

export default function StopCard({ stopName, studentCount, index }: StopCardProps) {
  return (
    <div className="stop-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-sm font-bold"
        >
          {index + 1}
        </div>
        <div>
          <div className="font-semibold text-[15px]">{stopName}</div>
          <div className="text-xs text-text-secondary flex items-center gap-1">
            <FiMapPin size={11} /> Stop {index + 1}
          </div>
        </div>
      </div>
      <div className="badge badge-accent flex items-center gap-1">
        <FiUsers size={12} />
        {studentCount} {studentCount === 1 ? "student" : "students"}
      </div>
    </div>
  );
}
