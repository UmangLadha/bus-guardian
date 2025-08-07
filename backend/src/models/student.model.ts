import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    studentId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    parentPhoneNo: { type: Number, required: true },
    assignedBus: {
      _id: { type: Schema.Types.ObjectId, ref: "Bus" },
      busNumber: String,
    },
    // pickupAddress: { type: String, required: true },
    // pickupLocation: {
    //   type: { type: String, enum: ["Point"], required: true },
    //   coordinates: { type: [Number], required: true },
    // },
  },
  { timestamps: true }
);

// studentSchema.index({ pickupLocation: "2dsphere" });

const Student = model("Student", studentSchema);

export default Student;
