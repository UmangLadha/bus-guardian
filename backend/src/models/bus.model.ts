import { Schema, model } from "mongoose";

const busSchema = new Schema(
  {
    busNumber: { type: String, required: true, unique: true },
    busCapacity: { type: Number, required: true },
    assignedDriver: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
      },
      driverName: String,
    },
    assignedRoute: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "BusRoute",
      },
      busRoute: String,
    },
  },
  { timestamps: true }
);

const Bus = model("Bus", busSchema);

export default Bus;
