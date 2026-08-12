import { Schema, model } from "mongoose";

const schoolSchema = new Schema(
  {
    schoolName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

const School = model("School", schoolSchema);

export default School;
