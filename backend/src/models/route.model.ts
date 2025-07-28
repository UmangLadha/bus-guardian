import { model, Schema } from "mongoose";

const busRouteSchema = new Schema(
  {
    routeName: { type: String, unique: true, required: true },
    routeList: [
      {
        locationName: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    ],
    assignedBus: {
      _id: { type: Schema.Types.ObjectId, ref: "Bus" },
      busNumber: String,
    },
  },
  { timestamps: true }
);

const BusRoute = model("BusRoute", busRouteSchema);

export default BusRoute;
