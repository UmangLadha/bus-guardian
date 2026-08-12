import { FiNavigation, FiSquare } from "react-icons/fi";

import { TripControlsProps } from "../types";

export default function TripControls({
  isTripActive,
  isLoading,
  onStartTrip,
  onEndTrip,
  locationError,
}: TripControlsProps) {
  return (
    <div className="glass-card text-center">
      <h3 className="text-lg font-bold mb-2">
        Trip Controls
      </h3>
      <p className="text-[13px] text-text-secondary mb-5">
        {isTripActive
          ? "Trip is active. Your location is being shared with parents."
          : "Start your trip to begin sharing your live location."}
      </p>

      {locationError && (
        <div className="bg-danger/10 border border-danger/30 rounded-[10px] py-2.5 px-3.5 mb-4 text-[13px] text-danger">
          {locationError}
        </div>
      )}

      {isTripActive ? (
        <div className="flex flex-col gap-2.5">
          <div className="badge badge-success self-center py-1.5 px-4">
            <span className="w-2 h-2 rounded-full bg-success mr-2 inline-block"></span>
            Live Tracking Active
          </div>
          <button
            className="btn-danger"
            onClick={onEndTrip}
            disabled={isLoading}
          >
            <FiSquare size={18} />
            {isLoading ? "Ending Trip..." : "End Trip"}
          </button>
        </div>
      ) : (
        <button
          className="btn-success text-lg py-4 px-8"
          onClick={onStartTrip}
          disabled={isLoading}
        >
          <FiNavigation size={20} />
          {isLoading ? "Starting Trip..." : "Start Trip"}
        </button>
      )}
    </div>
  );
}
