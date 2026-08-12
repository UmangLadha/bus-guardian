import { Schema, model } from "mongoose";

const locationChangeRequestSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    parentPhoneNo: { type: String, required: true },
    currentCheckpoint: { type: String, required: true },
    requestedCheckpoint: { type: String, required: true },
    reason: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    respondedAt: { type: Date },
  },
  { timestamps: true }
);

const LocationChangeRequest = model(
  "LocationChangeRequest",
  locationChangeRequestSchema
);

export default LocationChangeRequest;
