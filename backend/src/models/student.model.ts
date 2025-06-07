import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    studentId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    parentContact: { type: Number, required: true },
    busAssigned: { type: Schema.Types.ObjectId, ref: "Bus" },
    pickupAddress: { type: String, required: true },
    pickupLocation: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
  { timestamps: true }
);

studentSchema.index({ pickupLocation: "2dsphere" });

const Student = model("Student", studentSchema);

export default Student;
