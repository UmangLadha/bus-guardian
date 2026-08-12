import { Schema, model } from "mongoose";

const alertSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["departed", "arrived", "nearby"],
      required: true,
    },
    busId: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    busNumber: { type: String },
    message: { type: String, required: true },
    targetParents: [{ type: String }], // parent phone numbers
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Alert = model("Alert", alertSchema);

export default Alert;
