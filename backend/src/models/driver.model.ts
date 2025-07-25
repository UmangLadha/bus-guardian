import { Schema, model } from "mongoose";

const driverSchema = new Schema(
  {
    driverName: { type: String, required: true },
    driverPhoneNo: { type: Number, required: true },
    assignedBus: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Bus",
      },
      busNumber: String,
    },
  },
  { timestamps: true }
);

const Driver = model("Driver", driverSchema);

export default Driver;
