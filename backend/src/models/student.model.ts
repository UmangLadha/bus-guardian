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
    checkpoint: { type: String },
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);

export default Student;
