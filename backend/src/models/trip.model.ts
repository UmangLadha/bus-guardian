import { Schema, model } from "mongoose";

const tripSchema = new Schema(
  {
    busId: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    driverId: { type: Schema.Types.ObjectId, ref: "Driver", required: true },
    routeId: { type: Schema.Types.ObjectId, ref: "BusRoute", required: true },
    status: {
      type: String,
      enum: ["started", "completed"],
      default: "started",
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    liveLocation: {
      lat: { type: Number },
      lng: { type: Number },
      updatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

const Trip = model("Trip", tripSchema);

export default Trip;
